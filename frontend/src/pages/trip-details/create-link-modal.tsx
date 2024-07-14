import { FormEvent } from "react";
import { Modal } from "../../components/modal";
import { Input } from "../../components/input";
import { Link2, Tag } from "lucide-react";
import { Button } from "../../components/button";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";

interface CreateLinkModalProps {
  closeCreateLinkModal: () => void;
}

export function CreateLinkModal({
  closeCreateLinkModal,
}: CreateLinkModalProps) {
  const { tripId } = useParams();

  async function createLink(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event?.currentTarget);

    const title = data.get("title");
    const url = data.get("url");

    await api.post(`/trips/${tripId}/links`, {
      title,
      url,
    });

    window.document.location.reload();
  }

  return (
    <Modal
      title="Cadastrar link"
      description="Todos convidados podem visualizar os links importantes."
      closeModal={closeCreateLinkModal}
    >
      <form onSubmit={createLink} className="flex flex-col gap-2">
        <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
          <Input
            icon={<Tag className="size-5 text-zinc-400" />}
            name="title"
            placeholder="Título do link?"
            className="flex-1"
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="h-14 px-4 flex-1 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <Input
              icon={<Link2 className="size-5 text-zinc-400" />}
              type="url"
              name="url"
              placeholder="URL"
              className="flex-1 [color-scheme:dark]"
            />
          </div>
        </div>

        <Button type="submit" variant="primary" size="full">
          Salvar link
        </Button>
      </form>
    </Modal>
  );
}
