import { useState } from "react";
import { Users, UserPlus, Check, X, MessageCircle, Plane } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { mockCompanions } from "@/data/mockUserData";
import { Companion } from "@/types/travel";
import { cn } from "@/lib/utils";

const Companions = () => {
  const [companions, setCompanions] = useState<Companion[]>(mockCompanions);
  const [inviteEmail, setInviteEmail] = useState("");

  const acceptedCompanions = companions.filter((c) => c.status === "accepted");
  const pendingCompanions = companions.filter((c) => c.status === "pending");

  const handleAccept = (id: string) => {
    setCompanions((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: "accepted" as const } : c))
    );
  };

  const handleReject = (id: string) => {
    setCompanions((prev) => prev.filter((c) => c.id !== id));
  };

  const handleInvite = () => {
    if (inviteEmail) {
      // Mock invite
      console.log("Invite sent to:", inviteEmail);
      setInviteEmail("");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-foreground">Попутчики</h1>
        <p className="mt-1 text-muted-foreground">
          Путешествуйте вместе с друзьями
        </p>
      </div>

      {/* Invite Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Пригласить друга
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <Input
              type="email"
              placeholder="Email друга"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleInvite} disabled={!inviteEmail}>
              Отправить приглашение
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Pending Requests */}
      {pendingCompanions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Входящие приглашения
              <Badge variant="secondary">{pendingCompanions.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {pendingCompanions.map((companion) => (
              <div
                key={companion.id}
                className="flex items-center gap-4 rounded-lg border border-border p-4"
              >
                <Avatar className="h-12 w-12">
                  <AvatarImage src={companion.avatar} alt={companion.name} />
                  <AvatarFallback>
                    {companion.name.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium">{companion.name}</p>
                  <p className="text-sm text-muted-foreground">Хочет путешествовать с вами</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleReject(companion.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <Button size="sm" onClick={() => handleAccept(companion.id)}>
                    <Check className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Companions List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Мои попутчики
            <Badge variant="secondary">{acceptedCompanions.length}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {acceptedCompanions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8">
              <Users className="h-12 w-12 text-muted-foreground/50" />
              <h3 className="mt-4 font-display text-lg font-semibold">Пока нет попутчиков</h3>
              <p className="mt-1 text-center text-sm text-muted-foreground">
                Пригласите друзей, чтобы планировать путешествия вместе
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {acceptedCompanions.map((companion) => (
                <div
                  key={companion.id}
                  className="group flex items-center gap-4 rounded-xl border border-border p-4 transition-all duration-200 hover:border-primary/30 hover:shadow-soft"
                >
                  <Avatar className="h-14 w-14">
                    <AvatarImage src={companion.avatar} alt={companion.name} />
                    <AvatarFallback>
                      {companion.name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium">{companion.name}</p>
                    <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                      <Plane className="h-3 w-3" />
                      {companion.sharedTrips} совместных поездок
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="opacity-0 transition-opacity group-hover:opacity-100">
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Companions;
