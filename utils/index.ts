export interface TicketRecord {
  id: string;
  visitorId: string;
  ticket: Ticket | undefined;
  code: string;
  valid: boolean;
  redeemed: boolean;
}

export interface Ticket {
  id: string;
  name: string;
  amount: number;
  description: string;
}
