import { Tag, Calendar } from "lucide-react";
import { Button } from "../../components/button";
import { Modal } from "../../components/modal";
import { Input } from "../../components/input";
import { FormEvent } from "react";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";

interface CreateActivityModalProps {
  closeCreateActivityModal: () => void;
}

export function CreateActivityModal({
  closeCreateActivityModal,
}: CreateActivityModalProps) {
  const { tripId } = useParams();

  async function createActivity(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const title = data.get("title");
    const occurs_at = data.get("occurs_at");

    await api.post(`/trips/${tripId}/activities`, {
      title,
      occurs_at,
    });

    window.document.location.reload();
  }

  return (
    <Modal
      title="Cadastrar atividade"
      description="Todos convidados podem visualizar as atividades."
      closeModal={closeCreateActivityModal}
    >
      <form onSubmit={createActivity} className="flex flex-col gap-2">
        <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
          <Input
            icon={<Tag className="size-5 text-zinc-400" />}
            name="title"
            placeholder="Qual a atividade?"
            className="flex-1"
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="h-14 px-4 flex-1 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <Input
              icon={<Calendar className="size-5 text-zinc-400" />}
              type="datetime-local"
              name="occurs_at"
              placeholder="Seu e-mail pessoal"
              className="flex-1 [color-scheme:dark]"
            />
          </div>
        </div>

        <Button type="submit" variant="primary" size="full">
          Salvar atividade
        </Button>
      </form>
    </Modal>
  );
}
