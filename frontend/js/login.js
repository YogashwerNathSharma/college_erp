const form = document.getElementById("loginForm");
const email = document.getElementById("email");
const password = document.getElementById("password");
const errorMsg = document.getElementById("errorMsg");
const showPassword = document.getElementById("showPassword");
const forgotPassword = document.getElementById("forgotPassword");

// Show / Hide Password
showPassword.addEventListener("change", () => {
  password.type = showPassword.checked ? "text" : "password";
});

// Login Submit
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // ===== VALIDATIONS =====
  if (!email.value || !password.value) {
    errorMsg.textContent = "All fields are required";
    return;
  }

  if (!email.value.includes("@")) {
    errorMsg.textContent = "Invalid email format";
    return;
  }

  if (password.value.length < 6) {
    errorMsg.textContent = "Password must be at least 6 characters";
    return;
  }

  errorMsg.textContent = "";

  // ===== API CALL =====
  try {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      errorMsg.textContent = data.message || "Login failed";
      return;
    }

    // Save token
    localStorage.setItem("token", data.token);

    // Redirect to dashboard
    window.location.href = "dashboard.html";

  } catch (error) {
    errorMsg.textContent = "Server error. Try again later.";
  }
});

// Forgot Password
forgotPassword.addEventListener("click", () => {
  const userEmail = prompt("Enter your registered email");

  if (!userEmail) return;

  alert(
    "Password reset link will be sent to: " + userEmail +
    "\n(Backend API required)"
  );
});
