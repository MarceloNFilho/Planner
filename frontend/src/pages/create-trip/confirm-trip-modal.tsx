import { User, Check, Mail } from "lucide-react";
import { FormEvent } from "react";
import { Button } from "../../components/button";
import { Modal } from "../../components/modal";
import { Input } from "../../components/input";

interface ConfirmTripModalProps {
  closeConfirmTripModal: () => void;
  createTrip: (event: FormEvent<HTMLFormElement>) => void;
  setOwnerName: (name: string) => void;
  setOwnerEmail: (email: string) => void;
}

export function ConfirmTripModal({
  closeConfirmTripModal,
  createTrip,
  setOwnerEmail,
  setOwnerName,
}: ConfirmTripModalProps) {
  return (
    <Modal
      title="Confirmar criação de viagem"
      description={
        <p className="text-sm text-zinc-400 text-left">
          Para concluir a criação da viagem para{" "}
          <span className="text-zinc-100 font-semibold">
            Florianópolis, Brasil
          </span>{" "}
          nas datas de{" "}
          <span className="text-zinc-100 font-semibold">
            16 a 27 de Agosto de 2024
          </span>{" "}
          preencha seus dados abaixo:
        </p>
      }
      closeModal={closeConfirmTripModal}
    >
      <form onSubmit={createTrip} className="flex flex-col gap-2">
        <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
          <Input
            icon={<User className="size-5 text-zinc-400" />}
            name="name"
            placeholder="Digite seu nome completo"
            onChange={(event) => setOwnerName(event.target.value)}
          />
        </div>

        <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
          <Input
            icon={<Mail className="size-5 text-zinc-400" />}
            type="email"
            name="email"
            placeholder="Seu e-mail pessoal"
            onChange={(event) => setOwnerEmail(event.target.value)}
          />
        </div>

        <Button type="submit" variant="primary" size="full">
          Confirmar criação da viagem
          <Check className="size-5" />
        </Button>
      </form>
    </Modal>
  );
}
