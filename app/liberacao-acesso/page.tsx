"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type User = {
  id: string;
  name: string;
  email: string;
  isMaster: boolean;
  canGrantAccess: boolean;
};

export default function LiberarAcesso() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editedUser, setEditedUser] = useState<Partial<User> | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/liberacao-acesso");
        if (!res.ok) throw new Error("Erro ao buscar usuários");
        const data = await res.json();
        setUsers(data);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError("Erro ao carregar usuários");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleCheckboxChange = (field: "canGrantAccess" | "isMaster", value: boolean) => {
    if (editedUser) {
      setEditedUser((prev) => ({
        ...prev!,
        [field]: value,
      }));
    }
  };

  const handleOpenDialog = (user: User) => {
    setEditedUser({ ...user });
  };

  const handleSave = async () => {
    if (!editedUser) return;

    try {
      const updates = ["canGrantAccess", "isMaster"] as const;

      await Promise.all(
        updates.map(async (field) => {
          if (editedUser[field] !== undefined) {
            const res = await fetch("/api/liberacao-acesso", {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ userId: editedUser.id, field, value: editedUser[field] }),
            });

            if (res.ok) {
              toast({
                title: "Alterado com sucesso!",
                description: "Os dados foram atualizados corretamente.",
                variant: "default",
                className: "bg-green-500 text-white"
              });
            } else {
              toast({
                title: `Erro ao atualizar ${field}`,
                variant: "destructive",
                description: "Não foi possível realizar a alteração das permissões.",
              });
            }
          }
        })
      );

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === editedUser.id ? { ...user, ...editedUser } : user
        )
      );

      setEditedUser(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section>
      <Header />
      <div className="container mt-5">
        <h1 className="text-2xl font-bold mb-4">Gerenciar Acessos</h1>

        {loading && <p>Carregando usuários...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <ul className="space-y-3">
          {users.map((user) => (
            <li
              key={user.id}
              className="border p-4 rounded-lg shadow flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{user.name}</p>
                <p className="text-gray-500">{user.email}</p>
              </div>
              <div>
                <Dialog onOpenChange={(open) => !open && setEditedUser(null)}>
                  <DialogTrigger asChild>
                    <Button onClick={() => handleOpenDialog(user)}>Editar Permissões</Button>
                  </DialogTrigger>
                  {editedUser && (
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Gerenciar acessos do usuário</DialogTitle>
                      </DialogHeader>
                      <ul className="grid gap-4 py-4">
                        <li className="flex items-center gap-2">
                          <Checkbox
                            checked={editedUser.canGrantAccess}
                            onCheckedChange={(checked) =>
                              handleCheckboxChange("canGrantAccess", !!checked)
                            }
                            id="1"
                          />
                          <label htmlFor="1" className="cursor-pointer">
                            Acesso restrito
                          </label>
                        </li>
                        <li className="flex items-center gap-2">
                          <Checkbox
                            checked={editedUser.isMaster}
                            onCheckedChange={(checked) =>
                              handleCheckboxChange("isMaster", !!checked)
                            }
                            id="2"
                          />
                          <label htmlFor="2" className="cursor-pointer">
                            Acesso master
                          </label>
                        </li>
                      </ul>
                      <DialogFooter>
                        <Button onClick={handleSave}>Salvar</Button>
                      </DialogFooter>
                    </DialogContent>
                  )}
                </Dialog>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
