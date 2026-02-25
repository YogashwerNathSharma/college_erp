document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("registerForm");
  const msg = document.getElementById("msg");

  if (!form) {
    console.error("Form not found");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (!name || !email || !password) {
      msg.innerText = "All fields are required";
      msg.style.color = "red";
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        msg.innerText = data.message || "Registration failed";
        msg.style.color = "red";
        return;
      }

      msg.innerText = "Registered successfully! Please login";
      msg.style.color = "green";
form.querySelector("button").disabled=true;
      setTimeout(() => {
     
      }, 3000);
   window.location.href = "login.html";
    } catch (err) {
      console.error(err);
      msg.innerText = "Something went wrong, Please try again later.";
      msg.style.color = "red";
    }
  });
});
