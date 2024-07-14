import { X, AtSign, Plus } from "lucide-react";
import { FormEvent } from "react";
import { Button } from "../../components/button";
import { Modal } from "../../components/modal";
import { Input } from "../../components/input";

interface InviteGuestModalProps {
  closeGuestModal: () => void;
  emailsToInvite: string[];
  addNewEmailToInvite: (event: FormEvent<HTMLFormElement>) => void;
  removeEmailFromInvites: (email: string) => void;
}

export function InviteGuestModal({
  closeGuestModal,
  emailsToInvite,
  addNewEmailToInvite,
  removeEmailFromInvites,
}: InviteGuestModalProps) {
  return (
    <Modal
      title="Selecionar convidados"
      description="Os convidados irão receber e-mails para confirmar a participação na viagem."
      closeModal={closeGuestModal}
    >
      <div className="flex flex-wrap gap-2">
        {emailsToInvite.map((email, index) => {
          return (
            <div
              key={index}
              className="py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2"
            >
              <span className="lowercase text-zinc-300">{email}</span>

              <button onClick={() => removeEmailFromInvites(email)}>
                <X className="size-4 text-zinc-400" />
              </button>
            </div>
          );
        })}
      </div>

      <div className="w-full h-px bg-zinc-800" />

      <form
        onSubmit={addNewEmailToInvite}
        className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center justify-between"
      >
        <div className="flex items-center gap-2">
          <Input
            icon={<AtSign className="size-5 text-zinc-400" />}
            type="email"
            name="email"
            placeholder="Digite o email do convidado?"
          />
        </div>

        <Button type="submit" variant="primary">
          Convidar
          <Plus className="size-5" />
        </Button>
      </form>
    </Modal>
  );
}
