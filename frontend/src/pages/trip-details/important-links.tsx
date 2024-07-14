import { Link2, Plus } from "lucide-react";
import { Button } from "../../components/button";
import { useEffect, useState } from "react";
import { CreateLinkModal } from "./create-link-modal";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";

interface Link {
  id: string;
  title: string;
  url: string;
}

export function ImportantLinks() {
  const { tripId } = useParams();
  const [isCreateLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [links, setLinks] = useState<Link[]>();

  function openLinkModal() {
    setIsLinkModalOpen(true);
  }

  function closeLinkModal() {
    setIsLinkModalOpen(false);
  }

  async function getLinks() {
    const response = await api.get(`/trips/${tripId}/links`);
    const data = response.data;

    console.log(data);

    setLinks(data);
  }

  useEffect(() => {
    getLinks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tripId]);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Links importantes</h2>

      {links?.map((link) => {
        return (
          <div key={link.id} className="space-y-5">
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-1.5 flex-1">
                <span className="block text-zinc-100 font-medium">
                  {link.title}
                </span>
                <a
                  href="#"
                  className="block text-xs text-zinc-400 hover:text-zinc-200 truncate"
                >
                  {link.url}
                </a>
              </div>
              <Link2 className="size-5" />
            </div>
          </div>
        );
      })}

      <Button variant="secondary" size="full" onClick={openLinkModal}>
        <Plus className="size-5" />
        Cadastrar novo link
      </Button>

      {isCreateLinkModalOpen && (
        <CreateLinkModal closeCreateLinkModal={closeLinkModal} />
      )}
    </div>
  );
}
