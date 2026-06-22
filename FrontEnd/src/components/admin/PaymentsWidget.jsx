import React, { useEffect, useState } from "react";
import adminService from "../../services/adminService";

const PaymentsWidget = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const data = await adminService.getAllPayments();
        console.log(await adminService.getAllPayments());
        console.log("PAYMENTS =", data);
        setPayments(data.payments || data || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPayments();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Payments</h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">OrderId</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Method</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Date</th>
            </tr>
          </thead>

          <tbody>
            {Array.isArray(payments) &&
              payments.map((payment) => (
                <tr key={payment._id} className="border-b">
                  <td className="p-3">{payment.user?.name}</td>
                  <td className="p-3">{payment.order?._id?.slice(-8)}</td>

                  <td className="p-3">₹{payment?.amount ?? 0}</td>

                  <td className="p-3">{payment.paymentMethod}</td>

                  <td className="p-3">
                    <span className="text-green-600 font-medium">
                      {payment.status}
                    </span>
                  </td>

                  <td className="p-3">
                    {payment.createdAt
                      ? new Date(payment.createdAt).toLocaleDateString()
                      : "-"}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentsWidget;
