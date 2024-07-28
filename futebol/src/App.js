import React, { useState } from 'react';
import TeamList from './components/TeamList';
import TeamForm from './components/TeamForm';

function App() {
  const [teamToEdit, setTeamToEdit] = useState(null);

  const handleEdit = (team) => {
    setTeamToEdit(team);
  };

  const handleSave = () => {
    setTeamToEdit(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">CRUD de Times de Futebol</h1>
      <TeamForm teamToEdit={teamToEdit} onSave={handleSave} />
      <TeamList onEdit={handleEdit} />
    </div>
  );
}

export default App;
