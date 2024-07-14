/* eslint-disable react-hooks/exhaustive-deps */
import { CircleCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Activity {
  id: string;
  title: string;
  occurs_at: string;
}

export function Activities() {
  const { tripId } = useParams();
  const [activities, setActivities] = useState<Activity[]>([]);

  async function getActivities() {
    const response = await api.get(`/trips/${tripId}/activities`);
    const data = response.data;

    setActivities(data);
  }

  useEffect(() => {
    getActivities();
  }, [tripId]);

  return (
    <div className="space-y-8">
      {activities.length > 0 ? (
        activities.map((activity) => (
          <div key={activity.id} className="space-y-2.5">
            <div className="flex gap-2 items-baseline">
              <span className="text-xl text-zinc-300 font-semibold">
                Dia {format(activity.occurs_at, "d", { locale: ptBR })}
              </span>
              <span className="text-xs text-zinc-500 capitalize">
                {format(activity.occurs_at, "EEEE", { locale: ptBR })}
              </span>
            </div>

            <div className="space-y-2.5">
              <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CircleCheck className="size-5 text-lime-300" />
                  <span className="text-zinc-100">{activity.title}</span>
                </div>

                <span className="text-zinc-400">
                  {format(activity.occurs_at, "hh")
                    .concat(":")
                    .concat(format(activity.occurs_at, "mm"))
                    .concat("h")}
                </span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-sm text-zinc-400">Nenhuma atividade cadastrada.</p>
      )}
    </div>
  );
}
