import React, { useState, useEffect } from 'react';
import { Plus, Phone, MapPin, Clock, User, AlertCircle, CheckCircle, Radio } from 'lucide-react';

const CADPage = () => {
  const [calls, setCalls] = useState([]);
  const [selectedCall, setSelectedCall] = useState(null);
  const [showNewCallForm, setShowNewCallForm] = useState(false);
  const [loading, setLoading] = useState(true);

  // New call form state
  const [newCall, setNewCall] = useState({
    time_received: new Date().toISOString().slice(0, 16),
    how_received: '',
    address_of_incident: '',
    nature: '',
    original_notes: '',
    caller_phone: '',
    caller_name: '',
    caller_dob: '',
    caller_address: '',
    primary_unit: '',
    dispatcher_initials: ''
  });

  // Radio log form state
  const [radioLog, setRadioLog] = useState({
    time: new Date().toTimeString().slice(0, 5),
    unit: '',
    notes: ''
  });

  const API_BASE = 'https://gtback-production.up.railway.app/api/cad';

  useEffect(() => {
    loadCalls();
    // Auto-refresh every 10 seconds
    const interval = setInterval(loadCalls, 10000);
    return () => clearInterval(interval);
  }, []);

  const loadCalls = async () => {
    try {
      const response = await fetch(`${API_BASE}/calls`);
      const data = await response.json();
      setCalls(data.calls || []);
      setLoading(false);
    } catch (error) {
      console.error('Error loading calls:', error);
      setLoading(false);
    }
  };

  const createCall = async () => {
    try {
      const response = await fetch(`${API_BASE}/calls`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCall)
      });
      
      if (response.ok) {
        setNewCall({
          time_received: new Date().toISOString().slice(0, 16),
          how_received: '',
          address_of_incident: '',
          nature: '',
          original_notes: '',
          caller_phone: '',
          caller_name: '',
          caller_dob: '',
          caller_address: '',
          primary_unit: '',
          dispatcher_initials: ''
        });
        setShowNewCallForm(false);
        loadCalls();
      }
    } catch (error) {
      console.error('Error creating call:', error);
    }
  };

  const dispatchCall = async (callId, dispatcherInitials) => {
    try {
      const response = await fetch(`${API_BASE}/calls/${callId}/dispatch`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dispatcher_initials: dispatcherInitials })
      });
      
      if (response.ok) {
        loadCalls();
      }
    } catch (error) {
      console.error('Error dispatching call:', error);
    }
  };

  const addRadioLog = async (callId) => {
    try {
      const response = await fetch(`${API_BASE}/calls/${callId}/radio-log`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(radioLog)
      });
      
      if (response.ok) {
        setRadioLog({
          time: new Date().toTimeString().slice(0, 5),
          unit: '',
          notes: ''
        });
        loadCalls();
        // Update selected call
        const updatedCall = calls.find(c => c.id === callId);
        if (updatedCall) {
          const response = await fetch(`${API_BASE}/calls`);
          const data = await response.json();
          const refreshedCall = data.calls.find(c => c.id === callId);
          setSelectedCall(refreshedCall);
        }
      }
    } catch (error) {
      console.error('Error adding radio log:', error);
    }
  };

  const formatTime = (timeString) => {
    if (!timeString) return '';
    return new Date(timeString).toLocaleTimeString();
  };

  const formatDate = (timeString) => {
    if (!timeString) return '';
    return new Date(timeString).toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading CAD System...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-red-800 p-4 border-b border-red-700">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">🚨 MAINE DPS - EMERGENCY CAD SYSTEM</h1>
            <p className="text-red-200">Computer Aided Dispatch - Emergency Operations</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-red-200">Active Calls: {calls.length}</div>
            <div className="text-sm text-red-200">
              Pending: {calls.filter(c => c.status === 'pending').length} | 
              Dispatched: {calls.filter(c => c.status === 'dispatched').length}
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-screen">
        {/* Call List */}
        <div className="w-1/2 p-4 border-r border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Active Calls</h2>
            <button
              onClick={() => setShowNewCallForm(true)}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded flex items-center gap-2"
            >
              <Plus size={16} />
              New Call
            </button>
          </div>

          <div className="space-y-2 max-h-screen overflow-y-auto">
            {calls.map(call => (
              <div
                key={call.id}
                onClick={() => setSelectedCall(call)}
                className={`p-3 rounded cursor-pointer border-l-4 ${
                  call.status === 'pending' 
                    ? 'bg-red-900 border-red-500 hover:bg-red-800' 
                    : 'bg-green-900 border-green-500 hover:bg-green-800'
                } ${selectedCall?.id === call.id ? 'ring-2 ring-blue-500' : ''}`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {call.status === 'pending' ? (
                        <AlertCircle size={16} className="text-red-400" />
                      ) : (
                        <CheckCircle size={16} className="text-green-400" />
                      )}
                      <span className="font-semibold text-sm">
                        {call.status === 'pending' ? 'NEEDS DISPATCH' : 'DISPATCHED'}
                      </span>
                    </div>
                    <div className="text-sm">
                      <div className="flex items-center gap-1 mb-1">
                        <Clock size={12} />
                        {formatTime(call.time_received)}
                      </div>
                      <div className="flex items-center gap-1 mb-1">
                        <MapPin size={12} />
                        {call.address_of_incident || 'No address'}
                      </div>
                      <div className="text-yellow-300 font-medium">
                        {call.nature || 'No nature specified'}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-400">
                    {call.dispatcher_initials && (
                      <div>Disp: {call.dispatcher_initials}</div>
                    )}
                    {call.primary_unit && (
                      <div>Unit: {call.primary_unit}</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call Details */}
        <div className="w-1/2 p-4">
          {selectedCall ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Call Details</h2>
                <div className="flex gap-2">
                  {selectedCall.status === 'pending' && (
                    <button
                      onClick={() => {
                        const initials = prompt('Enter dispatcher initials:');
                        if (initials) dispatchCall(selectedCall.id, initials);
                      }}
                      className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-sm"
                    >
                      Mark Dispatched
                    </button>
                  )}
                </div>
              </div>

              {/* Call Information */}
              <div className="bg-gray-800 p-4 rounded">
                <h3 className="font-semibold mb-2 text-yellow-300">CALL INFORMATION</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <label className="text-gray-400">Time Received:</label>
                    <div>{formatTime(selectedCall.time_received)} - {formatDate(selectedCall.time_received)}</div>
                  </div>
                  <div>
                    <label className="text-gray-400">How Received:</label>
                    <div>{selectedCall.how_received || 'Not specified'}</div>
                  </div>
                  <div className="col-span-2">
                    <label className="text-gray-400">Address of Incident:</label>
                    <div className="font-medium">{selectedCall.address_of_incident}</div>
                  </div>
                  <div className="col-span-2">
                    <label className="text-gray-400">Nature:</label>
                    <div className="font-medium text-yellow-300">{selectedCall.nature}</div>
                  </div>
                  <div className="col-span-2">
                    <label className="text-gray-400">Original Notes:</label>
                    <div className="bg-gray-700 p-2 rounded text-sm">
                      {selectedCall.original_notes || 'No notes'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Caller Information */}
              <div className="bg-gray-800 p-4 rounded">
                <h3 className="font-semibold mb-2 text-blue-300">CALLER INFORMATION</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <label className="text-gray-400">Phone:</label>
                    <div>{selectedCall.caller_phone || 'Not provided'}</div>
                  </div>
                  <div>
                    <label className="text-gray-400">Name:</label>
                    <div>{selectedCall.caller_name || 'Not provided'}</div>
                  </div>
                  <div>
                    <label className="text-gray-400">DOB:</label>
                    <div>{selectedCall.caller_dob || 'Not provided'}</div>
                  </div>
                  <div>
                    <label className="text-gray-400">Address:</label>
                    <div>{selectedCall.caller_address || 'Not provided'}</div>
                  </div>
                </div>
              </div>

              {/* Units */}
              <div className="bg-gray-800 p-4 rounded">
                <h3 className="font-semibold mb-2 text-green-300">UNITS</h3>
                <div className="text-sm">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400">Primary Unit:</span>
                    <span>{selectedCall.primary_unit || 'Not assigned'}</span>
                  </div>
                  {selectedCall.primary_dispatched_time && (
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-400">Dispatched:</span>
                      <span>{formatTime(selectedCall.primary_dispatched_time)}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Dispatcher:</span>
                    <span>{selectedCall.dispatcher_initials || 'Not assigned'}</span>
                  </div>
                </div>
              </div>

              {/* Radio Logs */}
              <div className="bg-gray-800 p-4 rounded">
                <h3 className="font-semibold mb-2 text-purple-300">RADIO LOGS</h3>
                
                {/* Add Radio Log Form */}
                <div className="mb-4 p-3 bg-gray-700 rounded">
                  <div className="grid grid-cols-3 gap-2 mb-2">
                    <input
                      type="time"
                      value={radioLog.time}
                      onChange={(e) => setRadioLog({...radioLog, time: e.target.value})}
                      className="bg-gray-600 p-1 rounded text-sm"
                    />
                    <input
                      type="text"
                      placeholder="Unit"
                      value={radioLog.unit}
                      onChange={(e) => setRadioLog({...radioLog, unit: e.target.value})}
                      className="bg-gray-600 p-1 rounded text-sm"
                    />
                    <button
                      onClick={() => addRadioLog(selectedCall.id)}
                      className="bg-purple-600 hover:bg-purple-700 px-2 py-1 rounded text-sm"
                    >
                      Add Log
                    </button>
                  </div>
                  <textarea
                    placeholder="Radio log notes..."
                    value={radioLog.notes}
                    onChange={(e) => setRadioLog({...radioLog, notes: e.target.value})}
                    className="w-full bg-gray-600 p-2 rounded text-sm"
                    rows="2"
                  />
                </div>

                {/* Radio Log Entries */}
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {selectedCall.radio_logs && selectedCall.radio_logs.length > 0 ? (
                    selectedCall.radio_logs.map((log, index) => (
                      <div key={index} className="bg-gray-700 p-2 rounded text-sm">
                        <div className="flex items-center gap-2 mb-1">
                          <Radio size={12} />
                          <span className="font-medium">{log.time}</span>
                          <span className="text-purple-300">{log.unit}</span>
                        </div>
                        <div className="text-gray-300">{log.notes}</div>
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-500 text-sm">No radio logs yet</div>
                  )}
                </div>
              </div>

              {/* Additional Comments */}
              <div className="bg-gray-800 p-4 rounded">
                <h3 className="font-semibold mb-2 text-orange-300">ADDITIONAL COMMENTS</h3>
                <div className="bg-gray-700 p-3 rounded text-sm min-h-20">
                  {selectedCall.additional_comments || 'No additional comments'}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              Select a call to view details
            </div>
          )}
        </div>
      </div>

      {/* New Call Modal */}
      {showNewCallForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg w-full max-w-2xl max-h-screen overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">New Emergency Call</h2>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Time Received</label>
                <input
                  type="datetime-local"
                  value={newCall.time_received}
                  onChange={(e) => setNewCall({...newCall, time_received: e.target.value})}
                  className="w-full bg-gray-700 p-2 rounded"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">How Received</label>
                <input
                  type="text"
                  value={newCall.how_received}
                  onChange={(e) => setNewCall({...newCall, how_received: e.target.value})}
                  className="w-full bg-gray-700 p-2 rounded"
                  placeholder="911, Radio, Walk-in, etc."
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm text-gray-400 mb-1">Address of Incident *</label>
              <input
                type="text"
                value={newCall.address_of_incident}
                onChange={(e) => setNewCall({...newCall, address_of_incident: e.target.value})}
                className="w-full bg-gray-700 p-2 rounded"
                placeholder="Street address, city, state"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm text-gray-400 mb-1">Nature of Call</label>
              <input
                type="text"
                value={newCall.nature}
                onChange={(e) => setNewCall({...newCall, nature: e.target.value})}
                className="w-full bg-gray-700 p-2 rounded"
                placeholder="Medical, Fire, Police, etc."
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Caller Phone</label>
                <input
                  type="tel"
                  value={newCall.caller_phone}
                  onChange={(e) => setNewCall({...newCall, caller_phone: e.target.value})}
                  className="w-full bg-gray-700 p-2 rounded"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Caller Name</label>
                <input
                  type="text"
                  value={newCall.caller_name}
                  onChange={(e) => setNewCall({...newCall, caller_name: e.target.value})}
                  className="w-full bg-gray-700 p-2 rounded"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Primary Unit</label>
                <input
                  type="text"
                  value={newCall.primary_unit}
                  onChange={(e) => setNewCall({...newCall, primary_unit: e.target.value})}
                  className="w-full bg-gray-700 p-2 rounded"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Dispatcher Initials</label>
                <input
                  type="text"
                  value={newCall.dispatcher_initials}
                  onChange={(e) => setNewCall({...newCall, dispatcher_initials: e.target.value})}
                  className="w-full bg-gray-700 p-2 rounded"
                  maxLength="10"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm text-gray-400 mb-1">Original Notes</label>
              <textarea
                value={newCall.original_notes}
                onChange={(e) => setNewCall({...newCall, original_notes: e.target.value})}
                className="w-full bg-gray-700 p-2 rounded"
                rows="3"
                placeholder="Initial call details..."
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowNewCallForm(false)}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded"
              >
                Cancel
              </button>
              <button
                onClick={createCall}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
              >
                Create Call
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CADPage;

