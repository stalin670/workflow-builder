# 🧠 AI Workflow Builder

A visual, node-based AI workflow builder that allows users to connect **Text**, **Image**, and **LLM** nodes to generate intelligent outputs using **Google Gemini**.
The platform supports **authentication**, **workflow persistence**, and **real-time AI execution** through a clean and scalable architecture built with **Next.js**.

---

## 🛠 Tech Stack

### Frontend

* **Next.js (App Router)**
* **React**
* **React Flow** – visual workflow canvas
* **Zustand** – global state management
* **Tailwind CSS** – UI styling

### Backend

* **Next.js API Routes**
* **MongoDB + Mongoose**
* **Zod** – runtime schema validation
* **Google Gemini API** – multimodal LLM (text + image)

---

## ✨ Features

* **Authentication**

  * User signup and login
  * Basic credential-based authentication

* **Visual Workflow Builder**

  * Drag-and-drop canvas
  * Connectable nodes using React Flow

* **Node Types**

  * **Text Node** – text input or AI output
  * **Image Node** – upload or capture images
  * **LLM Node** – process connected inputs using Gemini

* **Multimodal AI Support**

  * Text + Image inputs sent together to Gemini
  * Cleaned, human-readable output

* **Workflow Persistence**

  * Save workflows (nodes + edges) to MongoDB
  * Load the most recent workflow on page load

* **Global State Management**

  * Centralized node & edge management using Zustand
  * Toast notifications for user feedback

* **Modern UI**

  * Dark-themed interface
  * Minimal and focused design using Tailwind CSS

---

## 🧩 Backend & Data Flow Diagram

The following diagram illustrates how the **backend APIs**, **database**, and **Gemini AI** interact with each other.

![Image](https://github.com/user-attachments/assets/5d4418c0-b038-48e8-99c7-df96219aa7d0)

> **Flow Summary**:
>
> * React UI makes API calls to Next.js backend routes
> * Auth routes handle login/signup
> * Gemini route processes text + image inputs
> * Workflow routes persist and restore graph state from MongoDB

---

## 📂 Project Structure

```bash
app/
├── api/
│   ├── auth/
│   │   ├── login/route.ts
│   │   └── signup/route.ts
│   ├── gemini/route.ts
│   └── workflow/
│       ├── save/route.ts
│       └── load/route.ts
├── login/page.tsx
├── signup/page.tsx
└── page.tsx

components/
├── flow/
│   ├── nodes/
│   │   ├── TextNode.tsx
│   │   ├── ImageNode.tsx
│   │   └── LLMNode.tsx
│   └── FlowCanvas.tsx
├── Sidebar.tsx
├── Toolbar.tsx
├── Toast.tsx
└── ToastContainer.tsx

lib/
└── mongodb.ts

models/
├── User.ts
└── Workflow.ts

store/
├── flowStore.ts
└── toastStore.ts

.env.local
```

---

## 💻 Database Schema

### User Collection
![Image](https://github.com/user-attachments/assets/33ef5695-66cb-4c6d-a3d6-b006bba89fa9)

* **email**: User email (unique)
* **password**: User password
* **createdAt / updatedAt**

---

### Workflow Collection
![Image](https://github.com/user-attachments/assets/dac4a32e-04ee-4cd0-85d7-e0800a3bb33e)
* **name**: Workflow name
* **nodes**: Array of React Flow nodes
* **edges**: Array of React Flow edges
* **createdAt / updatedAt**

---

## 🚀 API Endpoints

### Authentication

* `POST /api/auth/login` – Login user
* `POST /api/auth/signup` – Register new user

---

### AI Processing

* `POST /api/gemini`

  * Accepts structured text & image inputs
  * Calls Google Gemini API
  * Returns cleaned AI-generated text

---

### Workflow Management
![Image](https://github.com/user-attachments/assets/2961e2c2-73ce-4f36-af89-9fd12203e408)
![Image](https://github.com/user-attachments/assets/0009d84d-8a45-4aa7-b804-89f32ee8020a)

* `POST /api/workflow/save` – Save workflow state
* `GET /api/workflow/load` – Load latest workflow

---

## 🔁 Core Workflow (How It Works)

1. **User logs in or signs up**
2. **User creates a workflow** by adding and connecting nodes
3. **LLM Node collects inputs** from connected Text/Image nodes
4. **Gemini API is called** with structured multimodal data
5. **Output is returned** and rendered as a new Text Node
6. **Workflow can be saved** and later restored

---

## 🔐 Environment Variables

Create a `.env.local` file in the root directory:

```bash
MONGODB_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_google_gemini_api_key
```

---

## ▶️ How to Run Locally

### Step 1: Clone the repository

```bash
git clone https://github.com/yourusername/ai-workflow-builder.git
```

### Step 2: Install dependencies

```bash
npm install
```

### Step 3: Start the development server

```bash
npm run dev
```

### Step 4: Open in browser

```
http://localhost:3000
```

---

## 🌱 Future Improvements

* Password hashing (bcrypt)
* JWT-based authentication
* User-specific workflows
* Workflow versioning
* Autosave support
* Support for multiple LLM providers

---

## 📞 Contact

For any questions or collaboration:

📧 **Email**: [ydamit5840@gmail.com](mailto:ydamit5840@gmail.com)
🔗 **GitHub**: [https://github.com/stalin670](https://github.com/stalin670)
🔗 **LinkedIn**: [https://www.linkedin.com/in/stalin67/](https://www.linkedin.com/in/stalin67/)

---
