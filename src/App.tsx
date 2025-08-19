import React, { useState } from "react";

function App() {
  const [accepted, setAccepted] = useState(false);
  const [showHome, setShowHome] = useState(false);
  const handleAccept = () => {
    setAccepted(true);
    setTimeout(() => setShowHome(true), 1000); // 1000ms
    // delay
  };

  if (!accepted) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
        <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 text-gray-800">
          <h2 className="text-xl font-bold mb-4">⚠️ Disclaimer</h2>
          <p className="mb-3">
            first.AI.d Surgio is for <strong>informational and educational purposes only</strong>. 
            It is <strong>not a medical device</strong> and does not provide professional 
            medical advice, diagnosis, or treatment. Always seek the guidance of a qualified 
            healthcare provider with any questions regarding a medical condition.
          </p>
          <p className="mb-3">
            This app is intended for use by individuals <strong>18 years of age or older</strong>. 
            If you are under 18, use it only under the supervision of a parent, guardian, 
            or licensed healthcare professional.
          </p>
          <p className="mb-4 font-semibold text-red-600">
            If you are experiencing a <strong>medical emergency</strong>, call <strong>911</strong> 
            or your local emergency number immediately.
          </p>
          <button
            onClick={handleAccept}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
          >
            I Understand & Continue
          </button>
        </div>
      </div>
    );
  }

   // Show a fade-out or loading effect during the delay (optional)
  if (!showHome) {
    return (
      
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50 transition-opacity duration-500">
        <div className="text-white text-xl animate-pulse">Loading...</div>
      </div>
    );
  }
return <SymptomChecker />;
}
  

const SymptomChecker: React.FC = () => {
  const [symptom, setSymptom] = useState("");
  const [carePlan, setCarePlan] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

 const handleSubmit = async () => {
  setLoading(true);
  try {
    // Check if we're in production (GitHub Pages) or development
    const isProduction = window.location.hostname === 'princeicstars.github.io';
    
    if (isProduction) {
      // Production mode - connect to deployed backend
      // Update this URL to your deployed backend
      const PRODUCTION_API_URL = 'https://your-backend-url.vercel.app'; // Replace with your actual backend URL
      
      const res = await fetch(`${PRODUCTION_API_URL}/api/symptom-checker`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symptom }),
      });

      const data = await res.json();
      setCarePlan(data.carePlan);
    } else {
      // Development mode - connect to local backend
      const res = await fetch('http://localhost:5000/api/symptom-checker', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symptom }),
      });

      const data = await res.json();
      setCarePlan(data.carePlan);
    }
  } catch (err) {
    console.error('Error:', err);
    
    // Fallback to demo mode if backend is unavailable
    const demoResponses = {
      'headache': `🎯 **Headache Care Plan**

• Stay hydrated - drink plenty of water
• Rest in a quiet, dark room
• Apply cold compress to forehead
• Take over-the-counter pain relief if needed
• Avoid bright lights and loud sounds

**Medical Supplies:**
- Cold compress or ice pack
- Electrolyte drinks
- Ibuprofen or acetaminophen
- Eye mask for darkness`,
      
      'fever': `🎯 **Fever Care Plan**

• Monitor temperature every 2-4 hours
• Rest and get plenty of sleep
• Drink fluids to prevent dehydration
• Take fever-reducing medication as directed
• Wear light, breathable clothing

**Medical Supplies:**
- Digital thermometer
- Fever reducer (acetaminophen/ibuprofen)
- Electrolyte drinks
- Cooling towels`,
      
      'cough': `🎯 **Cough Care Plan**

• Stay hydrated with warm liquids
• Use honey to soothe throat (not for children under 1)
• Elevate head while sleeping
• Avoid irritants like smoke
• Humidify the air

**Medical Supplies:**
- Humidifier
- Honey
- Throat lozenges
- Cough drops
- Herbal teas`,
      
      'default': `🎯 **General Wellness Plan**

• Rest and get adequate sleep
• Stay hydrated
• Eat nutritious foods
• Monitor symptoms
• Consult healthcare provider if symptoms worsen

**Medical Supplies:**
- Digital thermometer
- Basic first aid kit
- Electrolyte drinks
- Pain relievers (as appropriate)

*Backend unavailable - showing demo response. For real symptoms, please consult a healthcare professional.*`
    };
    
    // Find matching response or use default
    const symptomLower = symptom.toLowerCase();
    let response = demoResponses.default;
    
    for (const [key, value] of Object.entries(demoResponses)) {
      if (key !== 'default' && symptomLower.includes(key)) {
        response = value;
        break;
      }
    }
    
    setCarePlan(response);
  }
  setLoading(false);
};

// ...existing code...

const handleOrderSupplies = () => {
  if (!carePlan) return;
  // Extract bullet points (supplies) from carePlan
  const supplies = carePlan
    .split('\n')
    .filter(line => line.trim().startsWith('-') || line.trim().startsWith('•'))
    .map(line => line.replace(/^[-•]\s*/, '').trim())
    .join(', ');
  if (supplies) {
    const query = encodeURIComponent(supplies);
    // Open Amazon search (you can change to Walmart or another store)
    window.open(`https://www.amazon.com/s?k=${query}`, "_blank");
  } else {
    alert("No supplies found in care plan.");
  }
};


  return (
    <div className="max-w-md mx-auto mt-10 bg-bubbleBlue p-6 rounded-[30px] shadow-xl border-4 border-softPink font-cartoon">
  <h1 className="text-3xl font-bold text-center text-gray-800 mb-1">
    🤖 first.AI.d Surgio 
  </h1>
  <p className="text-center text-sm text-gray-600 mb-4">
    AI Symptom Checker & Plan Generator
  </p>


  <div className="flex gap-2">
    <form
    onSubmit={e => {
      e.preventDefault();
        handleSubmit();
      }}
      >
    <input
      type="text"
      placeholder="Tell Me How You Feel?"
      className="flex-1 border-2 border-gray-300 rounded-xl px-6 py-4 text-lg bg-white shadow-sm focus:outline-none h-14"
      value={symptom}
      onChange={(e) => setSymptom(e.target.value)}
    />
     <button
        type="submit"
        disabled={loading}
        className="bg-sunnyYellow text-black px-4 py-2 rounded-xl border border-yellow-400 hover:bg-yellow-300 shadow-md"
      >
      ➔
    </button>
    </form>
  </div>

  {carePlan && (
    <div className="bg-white mt-4 p-4 rounded-xl shadow-inner border-2 border-mintyGreen">
      <h2 className="font-bold text-lg mb-1 text-gray-700">✨ Your Plan:</h2>
      <p className="text-sm whitespace-pre-line text-gray-600">{carePlan}</p>
       <ul className="list-disc list-inside text-gray-600 text-sm">
      {carePlan
        .split('\n')
        .filter(line => line.trim().startsWith('-'))
        .map((line, idx) => (
          <li key={idx}>{line.replace(/^[-•]\s*/, '')}</li>
        ))}
    </ul>
    </div>
  )}

  <div className="flex justify-around mt-6">
    <button
  className="flex items-center gap-2 bg-white border-2 border-gray-200 rounded-xl px-3 py-2 text-sm hover:bg-softPink shadow"
  onClick={handleOrderSupplies}
>
  🧾 Order Supplies
</button>
    <button className="flex items-center gap-2 bg-white border-2 border-gray-200 rounded-xl px-3 py-2 text-sm hover:bg-mintyGreen shadow">
      📅 Schedule Appointment
    </button>
  </div>
</div>

  );
};

export default App;
export { SymptomChecker };
