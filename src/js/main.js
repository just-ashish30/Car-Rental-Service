/**
 * DriveEasy Main JavaScript
 * Frontend-only prototype:
 * - Dynamic rendering (fleet, featured, details)
 * - Client-side auth simulation (localStorage)
 * - Booking CRUD simulation (localStorage)
 * - Form validation + UI feedback (Bootstrap + jQuery)
 */

$(document).ready(function () {
    const STORAGE_KEYS = {
        users: "driveEasyUsers",
        session: "driveEasySession",
        bookings: "driveEasyBookings"
    };

    function nowIso() {
        return new Date().toISOString();
    }

    function getQueryParam(name) {
        return new URLSearchParams(window.location.search).get(name);
    }

    function safeJsonParse(value, fallback) {
        try {
            return JSON.parse(value) ?? fallback;
        } catch {
            return fallback;
        }
    }

    function getUsers() {
        return safeJsonParse(localStorage.getItem(STORAGE_KEYS.users), []);
    }

    function saveUsers(users) {
        localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(users));
    }

    function getSession() {
        return safeJsonParse(localStorage.getItem(STORAGE_KEYS.session), null);
    }

    function setSession(session) {
        localStorage.setItem(STORAGE_KEYS.session, JSON.stringify(session));
    }

    function clearSession() {
        localStorage.removeItem(STORAGE_KEYS.session);
    }

    function getCurrentUser() {
        const session = getSession();
        if (!session?.userId) return null;
        const users = getUsers();
        return users.find(u => u.id === session.userId) || null;
    }

    function normalizeEmail(email) {
        return String(email || "").trim().toLowerCase();
    }

    function pseudoHash(password) {
        // Frontend-only prototype: NOT secure. Used only to avoid storing raw text visually.
        return btoa(unescape(encodeURIComponent(String(password || ""))));
    }

    function getBookings() {
        return safeJsonParse(localStorage.getItem(STORAGE_KEYS.bookings), []);
    }

    function saveBookings(bookings) {
        localStorage.setItem(STORAGE_KEYS.bookings, JSON.stringify(bookings));
    }

    function currency(n) {
        const num = Number(n || 0);
        return num.toFixed(2);
    }

    function daysBetween(startStr, endStr) {
        const start = new Date(startStr);
        const end = new Date(endStr);
        const ms = end - start;
        if (!Number.isFinite(ms)) return 0;
        return Math.floor(ms / (1000 * 60 * 60 * 24));
    }

    function setYear() {
        const y = new Date().getFullYear();
        $("#year").text(y);
    }

    function renderAccountMenu() {
        const user = getCurrentUser();
        if (!$("#account-menu").length) return;

        if (!user) {
            $("#account-menu").html(`
                <li><a class="dropdown-item" href="login.html">Login</a></li>
                <li><a class="dropdown-item" href="register.html">Register</a></li>
            `);
            return;
        }

        $("#account-menu").html(`
            <li><h6 class="dropdown-header">Signed in</h6></li>
            <li><span class="dropdown-item-text small text-muted">${user.email}</span></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="profile.html">Profile</a></li>
            <li><a class="dropdown-item" href="dashboard.html">Dashboard</a></li>
            <li><button class="dropdown-item" type="button" id="logout-btn">Logout</button></li>
        `);
    }

    function renderFeatured() {
        if (!$("#featured-cars").length) return;
        const cars = getVehicles().slice(0, 4);
        const html = cars.map(car => `
            <div class="col-sm-6 col-lg-3">
                <div class="card car-card h-100">
                    <img src="${car.image}" class="card-img-top" alt="${car.model}" loading="lazy" decoding="async" referrerpolicy="no-referrer">
                    <div class="card-body">
                        <h3 class="h6 mb-1">${car.model}</h3>
                        <div class="small text-muted mb-2">${car.type} • ${car.seats} seats • ${car.transmission}</div>
                        <div class="d-flex align-items-baseline justify-content-between">
                            <div class="text-primary fw-semibold">$${car.price}/day</div>
                            <a class="btn btn-sm btn-outline-primary" href="car-details.html?carId=${car.id}">Details</a>
                        </div>
                    </div>
                </div>
            </div>
        `).join("");
        $("#featured-cars").html(html);
    }

    function renderFleet(list) {
        const html = list.map(car => `
            <div class="col-sm-6 col-xl-4">
                <div class="card car-card h-100">
                    <img src="${car.image}" class="card-img-top" alt="${car.model}" loading="lazy" decoding="async" referrerpolicy="no-referrer">
                    <div class="card-body d-flex flex-column">
                        <div class="d-flex align-items-start justify-content-between gap-2">
                            <h3 class="h6 mb-1">${car.model}</h3>
                            <span class="badge text-bg-light border">${car.type}</span>
                        </div>
                        <div class="small text-muted mb-2">${car.seats} seats • ${car.transmission} • ${car.fuel}</div>
                        <div class="text-primary fw-semibold mb-2">$${car.price}/day</div>
                        <p class="small text-muted flex-grow-1 mb-3">${car.description}</p>
                        <div class="d-flex gap-2 mt-auto">
                            <a href="car-details.html?carId=${car.id}" class="btn btn-outline-secondary w-50">View</a>
                            <a href="booking.html?carId=${car.id}" class="btn btn-outline-primary w-50">Book</a>
                        </div>
                    </div>
                </div>
            </div>
        `).join("");

        $("#car-list").html(html);
        $("#fleet-empty").toggleClass("d-none", list.length !== 0);
    }

    function applyFleetFilters() {
        const q = String($("#fleet-search").val() || "").trim().toLowerCase();
        const type = String($("#filter-type").val() || "");
        const transmission = String($("#filter-transmission").val() || "");
        const minSeats = Number($("#filter-seats").val() || 0);
        const maxPrice = Number($("#filter-max-price").val() || 0);

        let cars = getVehicles();

        if (q) {
            cars = cars.filter(c => {
                const hay = `${c.model} ${c.type} ${c.transmission} ${c.fuel}`.toLowerCase();
                return hay.includes(q);
            });
        }
        if (type) cars = cars.filter(c => c.type === type);
        if (transmission) cars = cars.filter(c => c.transmission === transmission);
        if (minSeats) cars = cars.filter(c => Number(c.seats) >= minSeats);
        if (maxPrice) cars = cars.filter(c => Number(c.price) <= maxPrice);

        renderFleet(cars);
    }

    function renderCarDetails() {
        if (!$("#details-title").length) return;
        const carId = Number(getQueryParam("carId") || 0);
        const car = getVehicles().find(c => Number(c.id) === carId);
        if (!car) {
            $("#details-title").text("Car not found");
            $("#details-subtitle").text("Please return to the fleet and select a vehicle.");
            $("#details-book-btn").addClass("disabled").attr("aria-disabled", "true");
            return;
        }

        $("#breadcrumb-car").text(car.model);
        $("#details-title").text(car.model);
        $("#details-category").text(car.type);
        $("#details-subtitle").text(car.description);
        $("#details-seats").text(`${car.seats} seats`);
        $("#details-transmission").text(car.transmission);
        $("#details-price").text(currency(car.price));
        $("#details-image").attr("src", car.image).attr("alt", car.model);
        $("#details-book-btn").attr("href", `booking.html?carId=${car.id}`);
    }

    function populateBookingCars() {
        if (!$("#booking-car-select").length) return;
        const cars = getVehicles();
        const options = cars.map(c => `<option value="${c.id}">${c.model} (${c.type}, $${c.price}/day)</option>`).join("");
        $("#booking-car-select").append(options);

        const carId = getQueryParam("carId");
        if (carId) $("#booking-car-select").val(String(carId));
    }

    function updateBookingSummary() {
        if (!$("#summary-total").length) return;
        const carId = Number($("#booking-car-select").val() || 0);
        const start = $("#start-date").val();
        const end = $("#end-date").val();

        const car = getVehicles().find(c => Number(c.id) === carId) || null;
        const days = start && end ? daysBetween(start, end) : 0;
        const rate = car ? Number(car.price) : 0;
        const total = days > 0 ? days * rate : 0;

        $("#summary-vehicle").text(car ? car.model : "—");
        $("#summary-days").text(days > 0 ? String(days) : "0");
        $("#summary-rate").text(currency(rate));
        $("#summary-total").text(currency(total));
    }

    function requireLoginOrRedirect() {
        const user = getCurrentUser();
        if (user) return user;
        alert("Please login to confirm a booking (frontend-only prototype).");
        const next = encodeURIComponent(window.location.pathname.split("/").pop() + window.location.search);
        window.location.href = `login.html?redirect=${next}`;
        return null;
    }

    function initBookingPage() {
        if (!$("#booking-form").length) return;

        populateBookingCars();
        const user = getCurrentUser();
        if (user) {
            if (!$("#customer-name").val()) $("#customer-name").val(user.fullName || "");
            if (!$("#customer-email").val()) $("#customer-email").val(user.email || "");
            if (!$("#customer-phone").val()) $("#customer-phone").val(user.phone || "");
        }
        updateBookingSummary();

        $("#booking-car-select, #start-date, #end-date").on("change input", function () {
            updateBookingSummary();
        });

        $("#booking-form").on("submit", function (e) {
            e.preventDefault();

            const form = this;
            $(form).addClass("was-validated");

            const start = $("#start-date").val();
            const end = $("#end-date").val();
            const validDates = start && end && new Date(start) < new Date(end);
            if (!validDates) {
                $("#end-date").addClass("is-invalid");
            }

            if (!form.checkValidity() || !validDates) return;

            const user = requireLoginOrRedirect();
            if (!user) return;

            const carId = Number($("#booking-car-select").val());
            const car = getVehicles().find(c => Number(c.id) === carId);
            const days = daysBetween(start, end);
            const rate = Number(car?.price || 0);
            const total = days * rate;

            const booking = {
                id: Date.now(),
                userId: user.id,
                customerName: String($("#customer-name").val()).trim(),
                customerEmail: normalizeEmail($("#customer-email").val()),
                customerPhone: String($("#customer-phone").val()).trim(),
                branch: String($("#pickup-branch").val()),
                carId: carId,
                carModel: car?.model || "Unknown",
                startDate: start,
                endDate: end,
                days: days,
                ratePerDay: rate,
                total: Number(total.toFixed(2)),
                status: "confirmed",
                createdAt: nowIso()
            };

            const bookings = getBookings();
            bookings.push(booking);
            saveBookings(bookings);

            window.location.href = "dashboard.html";
        });
    }

    function initDashboardPage() {
        if (!$("#booking-table-body").length) return;

        const user = getCurrentUser();
        if (!user) {
            $("#dashboard-login-alert").removeClass("d-none");
            $("#booking-table-body").html(`<tr><td colspan="6" class="text-center text-muted">Login required.</td></tr>`);
            return;
        }

        const bookings = getBookings().filter(b => b.userId === user.id);
        if (bookings.length === 0) {
            $("#booking-table-body").html(`<tr><td colspan="6" class="text-center text-muted">No bookings found.</td></tr>`);
            return;
        }

        const rows = bookings.map(b => `
            <tr>
                <td>${b.carModel}</td>
                <td>${b.startDate}</td>
                <td>${b.endDate}</td>
                <td>$${currency(b.total)}</td>
                <td><span class="badge bg-success text-uppercase">${b.status}</span></td>
                <td class="text-nowrap">
                    <button class="btn btn-sm btn-outline-secondary me-2 edit-booking" data-id="${b.id}" type="button" data-bs-toggle="modal" data-bs-target="#editBookingModal">Edit</button>
                    <button class="btn btn-sm btn-danger delete-booking" data-id="${b.id}" type="button">Cancel</button>
                </td>
            </tr>
        `).join("");
        $("#booking-table-body").html(rows);

        $(".delete-booking").on("click", function () {
            const id = Number($(this).data("id"));
            if (!confirm("Cancel this booking?")) return;
            const all = getBookings();
            const next = all.filter(b => b.id !== id);
            saveBookings(next);
            location.reload();
        });

        $(".edit-booking").on("click", function () {
            const id = Number($(this).data("id"));
            const all = getBookings();
            const b = all.find(x => x.id === id);
            if (!b) return;
            $("#edit-booking-id").val(String(b.id));
            $("#edit-start-date").val(b.startDate);
            $("#edit-end-date").val(b.endDate);
            $("#edit-booking-form").removeClass("was-validated");
            $("#edit-start-date, #edit-end-date").removeClass("is-invalid");
        });

        $("#save-booking-changes").on("click", function () {
            const form = document.getElementById("edit-booking-form");
            if (!form) return;
            $(form).addClass("was-validated");

            const id = Number($("#edit-booking-id").val());
            const start = $("#edit-start-date").val();
            const end = $("#edit-end-date").val();
            const validDates = start && end && new Date(start) < new Date(end);
            if (!validDates) {
                $("#edit-end-date").addClass("is-invalid");
            }
            if (!form.checkValidity() || !validDates) return;

            const all = getBookings();
            const idx = all.findIndex(x => x.id === id);
            if (idx === -1) return;

            const booking = all[idx];
            const car = getVehicles().find(c => Number(c.id) === Number(booking.carId));
            const days = daysBetween(start, end);
            const total = days * Number(car?.price || booking.ratePerDay || 0);

            all[idx] = {
                ...booking,
                startDate: start,
                endDate: end,
                days: days,
                total: Number(total.toFixed(2))
            };
            saveBookings(all);

            const modalEl = document.getElementById("editBookingModal");
            const modal = modalEl ? bootstrap.Modal.getInstance(modalEl) : null;
            if (modal) modal.hide();
            location.reload();
        });
    }

    function initAuthRedirect() {
        const redirect = getQueryParam("redirect");
        if (!redirect) return null;
        return decodeURIComponent(redirect);
    }

    function initRegisterPage() {
        if (!$("#register-form").length) return;
        $("#register-form").on("submit", function (e) {
            e.preventDefault();
            const form = this;
            $(form).addClass("was-validated");

            const name = String($("#reg-name").val()).trim();
            const email = normalizeEmail($("#reg-email").val());
            const pass = String($("#reg-password").val());
            const confirmPass = String($("#reg-confirm").val());
            const termsOk = $("#reg-terms").is(":checked");

            const passwordsMatch = pass && confirmPass && pass === confirmPass;
            if (!passwordsMatch) $("#reg-confirm").addClass("is-invalid");
            if (!termsOk) $("#reg-terms").addClass("is-invalid");
            if (!form.checkValidity() || !passwordsMatch || !termsOk) return;

            const users = getUsers();
            if (users.some(u => normalizeEmail(u.email) === email)) {
                alert("This email is already registered. Please login instead.");
                window.location.href = "login.html";
                return;
            }

            const user = {
                id: Date.now(),
                fullName: name,
                email: email,
                passwordHash: pseudoHash(pass),
                role: "customer",
                phone: "",
                license: "",
                city: "",
                notes: "",
                createdAt: nowIso()
            };
            users.push(user);
            saveUsers(users);
            setSession({ userId: user.id, createdAt: nowIso() });

            const next = initAuthRedirect();
            window.location.href = next || "dashboard.html";
        });
    }

    function initLoginPage() {
        if (!$("#login-form").length) return;
        $("#login-form").on("submit", function (e) {
            e.preventDefault();
            const form = this;
            $(form).addClass("was-validated");
            if (!form.checkValidity()) return;

            const email = normalizeEmail($("#login-email").val());
            const pass = String($("#login-password").val());

            const users = getUsers();
            const user = users.find(u => normalizeEmail(u.email) === email) || null;
            if (!user || user.passwordHash !== pseudoHash(pass)) {
                alert("Invalid email or password.");
                return;
            }

            setSession({ userId: user.id, createdAt: nowIso() });
            const next = initAuthRedirect();
            window.location.href = next || "dashboard.html";
        });
    }

    function initProfilePage() {
        if (!$("#profile-form").length) return;
        const user = getCurrentUser();
        if (!user) {
            alert("Please login to access your profile.");
            window.location.href = "login.html?redirect=profile.html";
            return;
        }

        $("#profile-email").text(user.email);
        $("#profile-role").text(user.role);

        $("#prof-name").val(user.fullName || "");
        $("#prof-phone").val(user.phone || "");
        $("#prof-license").val(user.license || "");
        $("#prof-city").val(user.city || "");
        $("#prof-notes").val(user.notes || "");

        $("#profile-reset").on("click", function () {
            $("#prof-name").val(user.fullName || "");
            $("#prof-phone").val(user.phone || "");
            $("#prof-license").val(user.license || "");
            $("#prof-city").val(user.city || "");
            $("#prof-notes").val(user.notes || "");
            $("#profile-form").removeClass("was-validated");
        });

        $("#profile-form").on("submit", function (e) {
            e.preventDefault();
            const form = this;
            $(form).addClass("was-validated");
            if (!form.checkValidity()) return;

            const users = getUsers();
            const idx = users.findIndex(u => u.id === user.id);
            if (idx === -1) return;

            users[idx] = {
                ...users[idx],
                fullName: String($("#prof-name").val()).trim(),
                phone: String($("#prof-phone").val()).trim(),
                license: String($("#prof-license").val()).trim(),
                city: String($("#prof-city").val()).trim(),
                notes: String($("#prof-notes").val()).trim()
            };
            saveUsers(users);
            alert("Profile updated successfully.");
        });
    }

    function initContactPage() {
        if (!$("#contact-form").length) return;
        $("#contact-form").on("submit", function (e) {
            e.preventDefault();
            const form = this;
            $(form).addClass("was-validated");
            if (!form.checkValidity()) return;

            const toastEl = document.getElementById("contactToast");
            if (toastEl) {
                bootstrap.Toast.getOrCreateInstance(toastEl).show();
            }
            form.reset();
            $(form).removeClass("was-validated");
        });
    }

    // Global logout handler (works even when dropdown items are injected)
    $(document).on("click", "#logout-btn", function () {
        clearSession();
        window.location.href = "index.html";
    });

    // Fleet events
    if ($("#car-list").length) {
        renderFleet(getVehicles());
        $("#apply-filters").on("click", applyFleetFilters);
        $("#fleet-search").on("input", applyFleetFilters);
        $("#fleet-reset").on("click", function () {
            $("#fleet-search").val("");
            $("#filter-type").val("");
            $("#filter-transmission").val("");
            $("#filter-seats").val("");
            $("#filter-max-price").val("");
            renderFleet(getVehicles());
        });
    }

    // Page initializers
    setYear();
    renderAccountMenu();
    renderFeatured();
    renderCarDetails();
    initBookingPage();
    initDashboardPage();
    initRegisterPage();
    initLoginPage();
    initProfilePage();
    initContactPage();
});