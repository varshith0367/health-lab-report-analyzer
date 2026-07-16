mkdir -p src

cat > src/main.tsx << 'EOF'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
EOF

cat > src/App.tsx << 'EOF'
import { Activity, TrendingUp, FileText } from 'lucide-react'

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Health Lab Report Analyzer
          </h1>
          <p className="text-xl text-gray-600">
            Analyze and track your lab reports with AI-powered insights
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6">
            <Activity className="w-8 h-8 text-blue-600 mb-4" />
            <h2 className="text-lg font-semibold mb-2">Analyze Reports</h2>
            <p className="text-gray-600">Upload and analyze your lab reports</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <TrendingUp className="w-8 h-8 text-green-600 mb-4" />
            <h2 className="text-lg font-semibold mb-2">Track Trends</h2>
            <p className="text-gray-600">Monitor your health metrics over time</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <FileText className="w-8 h-8 text-purple-600 mb-4" />
            <h2 className="text-lg font-semibold mb-2">Get Insights</h2>
            <p className="text-gray-600">Receive AI-powered health insights</p>
          </div>
        </div>
      </div>
    </div>
  )
}
EOF

cat > src/index.css << 'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  margin: 0;
  padding: 0;
}
EOF

git add src/
git commit -m "Add src directory with React app"
git push origin main
