import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { MapPin, Search } from "lucide-react";

const supabaseUrl = "https://vbuqgsehjdkhkwllcfnh.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZidXFnc2VoamRraGt3bGxjZm5oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI5ODk4MjYsImV4cCI6MjA2ODU2NTgyNn0.urXsMtADdtxiYSow85iXBgzbr0AHG7azZRL1QIW_slA";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function OmgevingsagentApp() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase.from("OmgevingsAnalyseTool").select("*");
      if (error) console.error("Error fetching projects:", error);
      else setProjects(data);
    };
    fetchProjects();
  }, []);

  return (
    <main style={{ backgroundColor: 'black', color: 'white', minHeight: '100vh', padding: '2rem' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <h1>Omgevingsagent PRO</h1>
        <button style={{ border: '1px solid white', padding: '0.5rem 1rem' }}>Sign in with Google</button>
      </header>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
        <section>
          <h2>Projecten</h2>
          <ul>
            {projects.length === 0 && <li>Geen projecten gevonden...</li>}
            {projects.map((project) => (
              <li key={project.id}>• {project.name}</li>
            ))}
          </ul>
        </section>
        <section style={{ backgroundColor: '#222', padding: '1rem', borderRadius: '1rem', textAlign: 'center' }}>
          <input placeholder="Zoek adres..." style={{ padding: '0.5rem', marginBottom: '1rem', width: '80%' }} />
          <div style={{ border: '1px solid white', height: '300px', borderRadius: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <MapPin size={32} style={{ color: 'orange' }} />
            <span style={{ marginLeft: '1rem' }}>Reineveldbrug en omgeving</span>
          </div>
        </section>
      </div>
    </main>
  );
}
