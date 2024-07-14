import { CheckCircle2, CircleDashed, UserCog } from "lucide-react";
import { Button } from "../../components/button";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";

interface Participant {
  id: string;
  name: string | null;
  email: string;
  isConfirmed: boolean;
}

export function Guests() {
  const { tripId } = useParams();
  const [participants, setParticipants] = useState<Participant[]>([]);

  async function getParticipants() {
    const response = await api.get(`/trips/${tripId}/participants`);
    const data = response.data;

    setParticipants(data);
  }

  useEffect(() => {
    getParticipants();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Convidados</h2>

      <div className="space-y-5">
        {participants.map((participant, index) => {
          return (
            <div
              key={participant.id}
              className="flex items-center justify-between gap-4"
            >
              <div key={participant.id} className="space-y-1.5 flex-1">
                <span className="block text-zinc-100 font-medium">
                  {`Convidado ${index + 1}`}
                </span>
                <span className="block text-sm text-zinc-400 truncate lowercase">
                  {participant.email}
                </span>
              </div>
              {participant.isConfirmed ? (
                <CheckCircle2 className="text-green-400 size-5" />
              ) : (
                <CircleDashed className="text-zinc-400 size-5" />
              )}
            </div>
          );
        })}
      </div>

      <Button variant="secondary" size="full">
        <UserCog className="size-5" />
        Gerenciar convidados
      </Button>
    </div>
  );
}
