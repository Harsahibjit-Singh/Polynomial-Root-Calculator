# 🖥️ Polynomial Root Calculator - Frontend

This is a modern, single-page application (SPA) built with **Next.js** and **Tailwind CSS**. It provides a clean, "Neo-Brutalist" mathematical user interface to calculate the roots of polynomials of any degree.

## 🔗 The API Connection

This frontend does **not** do the heavy math itself. Instead, it acts as the user interface for our custom **Python FastAPI backend**. 

Here is how it works:
1. The user types their coefficients (e.g., `1, -3, 2`) into the UI.
2. The frontend formats this data into JSON and sends a `POST` request to the API at `http://127.0.0.1:8000/solve`.
3. The API uses NumPy to calculate the roots and sends the results back.
4. The frontend displays the roots beautifully on the screen, formatting any complex numbers automatically.

---

## 📁 Folder Structure

```text
frontend/
├── src/
│   └── app/
│       ├── layout.js       # Main HTML wrapper and global settings
│       ├── page.jsx        # The main UI logic and API fetch call
│       └── globals.css     # Tailwind CSS imports
├── tailwind.config.js      # Tailwind styling rules
└── package.json            # Node.js dependencies