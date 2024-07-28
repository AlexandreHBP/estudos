import React, { useEffect, useState } from 'react';
import { getTeams, deleteTeam } from '../api/teams';

const TeamList = ({ onEdit }) => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    const response = await getTeams();
    setTeams(response.data);
  };

  const handleDelete = async (id) => {
    await deleteTeam(id);
    fetchTeams();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Lista de Times</h2>
      <ul className="mt-4">
        {teams.map((team) => (
          <li key={team.id} className="flex justify-between items-center mb-2 p-2 border rounded">
            <span>ID: {team.id}</span>
            <span>Nome: {team.nome_time}</span>
            <span>Títulos: {team.titulos}</span>
            <div>
              <button 
                className="mr-2 p-2 bg-blue-500 text-white rounded"
                onClick={() => onEdit(team)}
              >
                Editar
              </button>
              <button 
                className="p-2 bg-red-500 text-white rounded"
                onClick={() => handleDelete(team.id)}
              >
                Deletar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamList;
