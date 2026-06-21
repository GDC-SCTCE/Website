import { Check, X, Users } from "lucide-react";

interface RegistrationRowGroupProps {
  teamKey: string;
  members: any[];
  loadingId: string | null;
  setLoadingId: (id: string | null) => void;
  onApprove: (userId: string, questId: string) => Promise<void>;
  onReject: (userId: string, questId: string) => Promise<void>;
  onUpdateAttendance: (userId: string, questId: string, status: "ATTENDED" | "NOT_ATTENDED") => Promise<void>;
}

export function RegistrationRowGroup({
  teamKey,
  members,
  loadingId,
  setLoadingId,
  onApprove,
  onReject,
  onUpdateAttendance
}: RegistrationRowGroupProps) {
  const isTeam = teamKey.startsWith('TEAM_');
  const teamName = isTeam ? teamKey.replace('TEAM_', '') : 'Solo';

  return (
    <tbody className="border-b border-[#584235] hover:bg-[#1C1B1C]/50 transition-colors">
      {members.map((r: any, idx: number) => (
        <tr key={`${r.userId}-${r.questId}`} className={idx !== members.length - 1 ? "border-b border-[#584235]/30" : ""}>
          <td className="p-4 w-1/4">
            <p className="font-sora font-bold text-[14px] text-white">{r.user.fullName}</p>
            <p className="font-mono text-[10px] text-[#A78B7C] mt-1">{r.user.email} • {r.user.phone || 'No phone'}</p>
          </td>
          
          {idx === 0 && (
            <td className="p-4 border-l border-r border-[#584235] align-middle bg-[#131314]/30" rowSpan={members.length}>
              {isTeam ? (
                <div className="flex flex-col gap-2">
                  <span className="font-mono text-[14px] text-[#FFB68B] font-bold flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-[#FF7A00]" />
                    {teamName}
                  </span>
                  <span className="font-mono text-[10px] text-[#FFB68B] bg-[#584235] px-2 py-0.5 rounded-sm w-fit tracking-[1.2px]">
                    {members.length} MEMBER{members.length > 1 ? 'S' : ''}
                  </span>
                </div>
              ) : (
                <span className="font-mono text-[12px] text-[#A78B7C]">Solo Registration</span>
              )}
            </td>
          )}
          
          {idx === 0 && (
            <td className="p-4 w-1/5 border-r border-[#584235] align-middle" rowSpan={members.length}>
              <p className="font-mono text-[12px] text-[#FF7A00]">
                ₹{members.reduce((sum: number, m: any) => sum + (m.quest.price || 0), 0)}
              </p>
              <p className="font-mono text-[10px] text-[#E0C0AF] mt-1">
                {members.find((m: any) => m.upiRef)?.upiRef || 'N/A'}
              </p>
            </td>
          )}

          {(() => {
            const isPending = members.every((m: any) => m.status === 'PENDING');
            
            if (isPending) {
              if (idx === 0) {
                return (
                  <>
                    <td className="p-4 w-1/6 border-r border-[#584235] align-middle" rowSpan={members.length}>
                      <span className="font-mono text-[10px] px-2 py-1 rounded-sm border bg-[#FF7A00]/10 text-[#FF7A00] border-[#FF7A00]/20">
                        PENDING
                      </span>
                    </td>
                    <td className="p-4 text-right w-1/6 align-middle" rowSpan={members.length}>
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={async () => {
                            setLoadingId(teamKey);
                            try {
                              for (const m of members) await onApprove(m.userId, m.questId);
                            } catch (err) { console.error(err); alert("Failed to approve team"); }
                            setLoadingId(null);
                          }}
                          disabled={loadingId === teamKey}
                          className="bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 p-2 hover:bg-emerald-500/20 transition-colors disabled:opacity-50"
                          title="Approve Team"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={async () => {
                            if (!window.confirm("Are you sure you want to reject this team registration?")) return;
                            setLoadingId(teamKey);
                            try {
                              for (const m of members) await onReject(m.userId, m.questId);
                            } catch (err) { console.error(err); alert("Failed to reject team"); }
                            setLoadingId(null);
                          }}
                          disabled={loadingId === teamKey}
                          className="bg-red-500/10 text-red-500 border border-red-500/20 p-2 hover:bg-red-500/20 transition-colors disabled:opacity-50"
                          title="Reject Team"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </>
                );
              }
              return null; // Don't render for other idx when pending
            } else {
              // INDIVIDUAL STATUS & ACTIONS
              return (
                <>
                  <td className="p-4 w-1/6 border-r border-[#584235] align-middle">
                    <span className={`font-mono text-[10px] px-2 py-1 rounded-sm border ${
                      r.status === 'REGISTERED' || r.status === 'ATTENDED' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                      r.status === 'PENDING' ? 'bg-[#FF7A00]/10 text-[#FF7A00] border-[#FF7A00]/20' :
                      r.status === 'REJECTED' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                      r.status === 'NOT_ATTENDED' ? 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20' :
                      'bg-zinc-500/10 text-zinc-400 border-zinc-500/20'
                    }`}>
                      {r.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="p-4 text-right w-1/6 align-middle">
                    <div className="flex justify-end gap-2 flex-wrap">
                      {(r.status === "REGISTERED" || r.status === "NOT_ATTENDED") && (
                        <button 
                          onClick={() => onUpdateAttendance(r.userId, r.questId, "ATTENDED")}
                          disabled={loadingId === `${r.userId}-${r.questId}`}
                          className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 font-mono text-[10px] hover:bg-emerald-500/20 transition-colors disabled:opacity-50 flex items-center justify-center tracking-[1.2px]"
                        >
                          MARK ATTENDED
                        </button>
                      )}
                      {(r.status === "REGISTERED" || r.status === "ATTENDED") && (
                        <button 
                          onClick={() => onUpdateAttendance(r.userId, r.questId, "NOT_ATTENDED")}
                          disabled={loadingId === `${r.userId}-${r.questId}`}
                          className="bg-zinc-500/10 text-zinc-400 border border-zinc-500/20 px-3 py-1 font-mono text-[10px] hover:bg-zinc-500/20 transition-colors disabled:opacity-50 flex items-center justify-center tracking-[1.2px]"
                        >
                          NOT ATTENDED
                        </button>
                      )}
                      {(r.status === "PENDING" || r.status === "REGISTERED") && (
                        <button 
                          onClick={() => onReject(r.userId, r.questId)}
                          disabled={loadingId === `${r.userId}-${r.questId}`}
                          className="bg-red-500/10 text-red-500 border border-red-500/20 p-2 hover:bg-red-500/20 transition-colors disabled:opacity-50"
                          title="Reject Registration"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </>
              );
            }
          })()}
        </tr>
      ))}
    </tbody>
  );
}
