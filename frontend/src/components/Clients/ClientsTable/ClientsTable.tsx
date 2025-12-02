import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody } from "@/components/ui/table";
import ClientsTableHeader from "./ClientsTableHeader";
import type { ClientTemplate } from "@/constants/clientTemplates";
import ClientsRow from "./ClientsRow";
import { useGetClients } from "@/hooks/queryHooks/clients/useGetClients";
import ErrorMessage from "@/components/ui/custom/API/ErrorMessage";
import ClientsTableSkeleton from "./ClientsTableSkeleton";
import ConnectionError from "@/components/ui/custom/API/ConnectionError";
import EmptyResponse from "@/components/ui/custom/API/EmptyResponse";
import EmptyClientsTable from "./EmptyClientsTable";

function ClientsTable() {
  const { data, isError, isLoading, error } = useGetClients();

  if (isError)
    return (
      <ErrorMessage error={error}>
        <ConnectionError />
      </ErrorMessage>
    );

  if (!data && !isLoading)
    return (
      <EmptyResponse label="no clients in the database">
        <EmptyClientsTable />
      </EmptyResponse>
    );

  return (
    <Card className="max-h-160 overflow-auto mb-20 md:mb-10">
      <CardHeader className="">Clients Overview</CardHeader>
      <CardContent>
        {isLoading ? (
          <ClientsTableSkeleton />
        ) : (
          <Table>
            <ClientsTableHeader />
            <TableBody>
              {data.map((client: ClientTemplate) => (
                <ClientsRow key={client.client_id} client={client} />
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}

export default ClientsTable;
