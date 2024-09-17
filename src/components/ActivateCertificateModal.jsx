import React, { useState } from 'react';
import Modal from './Modal.jsx';
import useActivateCertificate from '../hooks/useActivateCertificate.js';

function ActivateCertificateModal({ isOpen, onClose, userId }) {
  const [certificateId, setCertificateId] = useState('');
  const { activateCertificate, loading, error } = useActivateCertificate();

  const handleActivate = async () => {
    await activateCertificate(certificateId, userId);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} header="Activate Certificate">
      <div className="flex flex-col gap-3">
        <label htmlFor="certificateId" className="font-bold">Certificate ID</label>
        <input
          type="text"
          id="certificateId"
          className="rounded-lg border-2 border-gray-300 p-2"
          value={certificateId}
          onChange={(e) => setCertificateId(e.target.value)}
        />
        <button
          onClick={handleActivate}
          className="rounded-lg bg-[#D3DBA8] mt-5 mx-auto ml-0"
          disabled={loading}
        >
          <p className="text-black p-2">{loading ? 'Activating...' : 'Activate'}</p>
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </Modal>
  );
}

export default ActivateCertificateModal;