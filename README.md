# RAG App Client – AI PDF Assistant (Frontend)

This is the frontend client for the **RAG (Retrieval-Augmented Generation) AI PDF Assistant**, built using **React** and **React Flow**. The application allows users to upload PDF documents and interact with them via a dynamic workflow using AI and embeddings.

---

##  Features

-  PDF Upload & Parsing
-  AI-based Question Answering (via backend RAG pipeline)
-  Visual Workflow Interface (powered by React Flow)
-  Modular, Component-Based Structure
-  API Key Support for embedding model

---

##  Tech Stack

- **React** (Vite)
- **React Flow**
- **Axios**
- **TypeScript**
- **Mantine UI** (optional, if used)
- **CSS Modules** or your chosen styling method

---

##  Installation & Setup

```bash
# 1. Clone the repo

# 2. Navigate into the folder
cd rag-app-client

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

> Make sure the backend RAG service is running at the URL specified in flow.js.

---


##  Build for Production

```bash
npm run build
```

To preview production build:

```bash
npm run preview
```


##  About the Project

This app is part of a full-stack **RAG AI Assistant** system. It connects with a Node.js + TypeScript backend that handles:

- PDF chunking
- Embedding (via API or local model)
- Vector store storage (e.g., ChromaDB)
- Retrieval + prompt generation
- LLM response generation (via OpenAI, Cohere, etc.)

---
