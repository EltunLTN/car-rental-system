import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody } from "@/components/ui/table";
import RecentRentalsHeader from "./RecentRentalsHeader";
import type { RecentRentalTemplate } from "@/constants/dashBoardTemplates";
import { useRecentRentals } from "@/hooks/queryHooks/dashboard/useRecentRentals";
import RentalRow from "./RentalRow";
import ErrorMessage from "@/components/ui/custom/API/ErrorMessage";

import RecentRentalsSkeleton from "./RecentRentalsSkeleton";
import ConnectionError from "@/components/ui/custom/API/ConnectionError";
import EmptyResponse from "@/components/ui/custom/API/EmptyResponse";
import EmptyRentals from "./EmptyRentals";

function RecentRentals() {
  const { data, isError, isLoading, error } = useRecentRentals();

  if (isError)
    return (
      <ErrorMessage error={error}>
        <ConnectionError />
      </ErrorMessage>
    );

  if (!data && isLoading)
    return (
      <EmptyResponse label="no rentals in the database">
        <EmptyRentals />
      </EmptyResponse>
    );

  return (
    <Card className="max-h-160 overflow-auto mb-20 md:mb-10">
      <CardHeader className="">Recent Rental Activities</CardHeader>
      <CardContent>
        {isLoading ? (
          <RecentRentalsSkeleton />
        ) : (
          <Table>
            <RecentRentalsHeader />
            <TableBody>
              {data.map((rental: RecentRentalTemplate) => (
                <RentalRow key={rental.rental_id} rental={rental} />
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}

export default RecentRentals;
