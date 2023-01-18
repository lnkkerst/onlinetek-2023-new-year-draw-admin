export interface TicketRecord {
  visitorId: string;
  ticket: string;
  valid: boolean;
}

export interface Ticket {
  code: string;
  used: boolean;
}
