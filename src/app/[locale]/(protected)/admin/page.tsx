import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/lib/db";
import { formatCurrency, formatNumber } from "@/lib/formatters";

async function getSalesData() {
  const data = await db.booking.aggregate({
    _sum: { pricePaid: true },
    _count: true,
  });

  //await wait(2000);

  return {
    amount: data._sum.pricePaid || 0,
    numberOfSales: data._count,
  };
}

/*function wait(duration: number) {
  return new Promise((res) => setTimeout(res, duration));
}*/

async function getUserData() {
  const [userCount, orderData] = await Promise.all([
    db.user.count(),
    db.booking.aggregate({
      _sum: { pricePaid: true },
    }),
  ]);

  return {
    userCount,
    averageValuePerUser:
      userCount === 0 ? 0 : (orderData._sum.pricePaid || 0) / userCount,
  };
}

async function getProductData() {
  const [activeCount, inactiveCount] = await Promise.all([
    db.tour.count({ where: { isAvailableForBooking: true } }),
    db.tour.count({ where: { isAvailableForBooking: false } }),
  ]);

  return { activeCount, inactiveCount };
}

export default async function AdminDashboard() {
  const [salesData, userData, productData] = await Promise.all([
    getSalesData(),
    getUserData(),
    getProductData(),
  ]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <DashboardCard
        title="Sales"
        subtitle={`${formatNumber(salesData.numberOfSales)} Orders`}
        body={formatCurrency(salesData.amount)}
      />
      <DashboardCard
        title="Customers"
        subtitle={`${formatCurrency(userData.averageValuePerUser)} Average Value`}
        body={formatNumber(userData.userCount)}
      />
      <DashboardCard
        title="Active Tours"
        subtitle={`${formatNumber(productData.inactiveCount)} Inactive`}
        body={formatNumber(productData.activeCount)}
      />
    </div>
  );
}

type DashboardCardProps = {
  title: string;
  subtitle: string;
  body: string;
};

function DashboardCard({ title, subtitle, body }: DashboardCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{body}</p>
      </CardContent>
    </Card>
  );
}
