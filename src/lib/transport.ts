import "server-only";
import { stringify } from "qs";
import { Query } from "@/types/where";
import { draftMode } from "next/dist/client/components/headers";

export type TransportProps = { collection: string, query?: Query };

export type GetProps = { 
  draftable?: boolean;
  options?: RequestInit;
};

export class QueryResult {
  constructor(private data: any) {}

  value(property?: string): any {
    if (property) return this.data[property];
    return this.data;
  }

  toSingle(): any {
    return this.data?.docs[0];
  }
}

class Transport {
  private collection: string;
  private url: string;

  constructor(options: TransportProps) {
    this.collection = options?.collection;
    this.url = this.buildUrl(options?.query);
  }

  private buildUrl(query?: Query): string {
    const queryStr = stringify(query, { addQueryPrefix: true });

    return `${process.env.PAYLOAD_SERVER_URL}/api/${this.collection}${queryStr}`;
  }

  async get(args?: GetProps): Promise<QueryResult> {
    const req = new URL(this.url);
    req.searchParams.append(
      "draft",
      encodeURIComponent(!!args?.draftable ? draftMode().isEnabled : false)
    );

    const response = await fetch(req, args?.options);

    if (!response.ok)
      throw new Error(`Failed to fetch - ${this.collection}`, {
        cause: {
          response,
        },
      });

    const data = await response.json();

    return new QueryResult(data);
  }
}

class ParallelTransport {
  private transports: Transport[];

  constructor(...options: TransportProps[]) {
    this.transports = options?.map((opt) => new Transport(opt));
  }

  async get(args?: GetProps): Promise<QueryResult[]> {
    const transportPromises = await Promise.all(this.transports?.map(async (transport) => await transport.get(args)));

    return transportPromises;
  }
}

export {
  ParallelTransport,
}

export default Transport;
