📊 Context Graph LLM — SAP Order-to-Cash Dataset Query System

An LLM-powered Graph Query System that allows users to explore and query SAP Order-to-Cash datasets using natural language.
The system builds a context graph from dataset tables and enables AI-driven querying with domain guardrails.

🚀 Project Overview

This project converts structured SAP datasets into a graph representation and allows users to:

✅ Visualize dataset relationships
✅ Ask dataset-related questions in natural language
✅ Generate SQL queries automatically using LLMs
✅ Enforce domain guardrails for safe querying

🧠 Architecture
Frontend (React)
        ↓
Graph View UI + Chat Interface
        ↓
Backend (Node.js + Express)
        ↓
Dataset Loader → Graph Builder → LLM Translator
        ↓
SAP O2C Dataset (Tables)
📂 Project Structure
context-graph-llm/
│
├── backend/
│   ├── src/
│   │   ├── app.js
│   │   ├── server.js
│   │   │
│   │   ├── routes/
│   │   │   ├── chat.routes.js
│   │   │   └── graph.routes.js
│   │   │
│   │   ├── data/
│   │   │   └── datasetLoader.js
│   │   │
│   │   ├── graph/
│   │   │   └── graphStore.js
│   │   │
│   │   ├── guardrails/
│   │   │   └── domainGuard.js
│   │   │
│   │   └── llm/
│   │       └── queryTranslator.js
│   │
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── GraphView.jsx
│   │   └── Chat.jsx
│
└── README.md
⚙️ Features
📈 Graph Visualization
Builds graph from dataset tables
Displays relationships between SAP entities
Interactive graph view
💬 Natural Language Query

Example:

Show product_plants data

Output:

Generated SQL query
🛡 Domain Guardrails

The system restricts queries to dataset-related questions only.

If query is unrelated:

"This system answers dataset related questions only."
🧩 Dataset

This project uses:

SAP Order-to-Cash Dataset

Example tables:

billing_document_headers
products
plants
product_plants
sales_order_headers
outbound_delivery_items
payments_accounts_receivable

Dataset is loaded dynamically from the data folder.

🔧 Installation
1️⃣ Clone Repository
git clone https://github.com/yourusername/context-graph-llm.git
cd context-graph-llm
2️⃣ Backend Setup
cd backend
npm install
3️⃣ Environment Variables

Create .env inside backend:

PORT=5000
DATASET_PATH=../data/sap-order-to-cash-dataset/sap-o2c-data
OPENAI_API_KEY=your_api_key_here
4️⃣ Start Backend
npm run dev

Expected output:

Loading dataset...
✅ Loaded 19 tables
Backend running on 5000
Building SAP graph...
5️⃣ Frontend Setup
cd frontend
npm install
npm start

Frontend runs on:

http://localhost:3000
🔌 API Endpoints
📊 Get Graph
GET /graph

Returns dataset graph structure.

💬 Ask Question
POST /chat
Request
{
  "message": "show product_plants"
}
Response
{
  "generatedSQL": "SELECT * FROM product_plants",
  "answer": "Query generated."
}
🧠 Core Modules
datasetLoader.js
Loads dataset folders as tables
Reads dataset path from .env
graphStore.js
Builds relationship graph
Stores nodes & edges
domainGuard.js
Ensures query belongs to dataset domain
queryTranslator.js
Converts natural language → SQL using LLM
🖥 Tech Stack
Frontend
React
Graph Visualization
Axios
Backend
Node.js
Express.js
dotenv
CORS
AI
LLM-based SQL generation
🧪 Example Workflow
Backend loads dataset
Graph is generated
User asks question
Guardrail validates query
LLM generates SQL
Result returned to UI
🛠 Troubleshooting
❌ Always getting:
This system answers dataset related questions only.

✅ Check:

domainGuard.js includes table names
Dataset loaded successfully
Query contains valid table keyword
❌ Nodemon crash

Run:

npm install

Check .env path correctness.

📌 Future Improvements
Execute SQL on real DB
Graph-based RAG retrieval
Query explanation generation
Multi-dataset support
Authentication layer
Vector database integration
👨‍💻 Author

Harshavardhan Korlepara

AI / ML Engineer | Full Stack Developer | Graph + LLM Systems

⭐ Acknowledgements
SAP O2C Dataset
OpenAI LLM APIs
React Graph Visualization Libraries
📜 License

MIT License
