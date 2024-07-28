import React, { useState, useEffect } from 'react';
import { createTeam, updateTeam } from '../api/teams';

const TeamForm = ({ teamToEdit, onSave }) => {
  const [team, setTeam] = useState({ id: '', nome_time: '', titulos: '' });
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (teamToEdit) {
      setTeam(teamToEdit);
      setIsEditMode(true);
    } else {
      setTeam({ id: '', nome_time: '', titulos: '' });
      setIsEditMode(false);
    }
  }, [teamToEdit]);

  const handleChange = (e) => {
    setTeam({ ...team, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditMode) {
      await updateTeam(team.id, team);
    } else {
      await createTeam(team);
    }
    setTeam({ id: '', nome_time: '', titulos: '' });
    onSave();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">{isEditMode ? 'Editar Time' : 'Adicionar Time'}</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        {!isEditMode && (
          <div className="mb-4">
            <label className="block text-gray-700">Id</label>
            <input
              type="text"
              name="id"
              value={team.id}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required={!isEditMode}
            />
          </div>
        )}
        <div className="mb-4">
          <label className="block text-gray-700">Nome do Time</label>
          <input
            type="text"
            name="nome_time"
            value={team.nome_time}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Titulos</label>
          <input
            type="text"
            name="titulos"
            value={team.titulos}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="p-2 bg-green-500 text-white rounded"
        >
          {isEditMode ? 'Atualizar' : 'Adicionar'}
        </button>
      </form>
    </div>
  );
};

export default TeamForm;
