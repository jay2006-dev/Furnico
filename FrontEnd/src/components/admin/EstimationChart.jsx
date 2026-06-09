import { useEffect, useState } from "react";
import adminService from "../../services/adminService";

const PieChart = ({ data, width = 300, height = 300 }) => {
  const colors = [
    "#3B82F6",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
    "#EC4899",
  ];

  const totalValue = data.reduce((sum, d) => sum + d.value, 0);

  if (totalValue === 0) return null;

  const slices = data.map((item, index) => {
    // Calculate starting angle for this slice by summing all previous slice angles
    const startAngle = data
      .slice(0, index)
      .reduce((sum, d) => sum + (d.value / totalValue) * 360, 0);
    const sliceAngle = (item.value / totalValue) * 360;
    const endAngle = startAngle + sliceAngle;

    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    const radius = width / 2 - 20;
    const x1 = width / 2 + radius * Math.cos(startRad);
    const y1 = height / 2 + radius * Math.sin(startRad);
    const x2 = width / 2 + radius * Math.cos(endRad);
    const y2 = height / 2 + radius * Math.sin(endRad);

    const largeArc = sliceAngle > 180 ? 1 : 0;

    const pathData = [
      `M ${width / 2} ${height / 2}`,
      `L ${x1} ${y1}`,
      `A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`,
      "Z",
    ].join(" ");

    const labelAngle = startAngle + sliceAngle / 2;
    const labelRad = (labelAngle * Math.PI) / 180;
    const labelRadius = radius * 0.65;
    const labelX = width / 2 + labelRadius * Math.cos(labelRad);
    const labelY = height / 2 + labelRadius * Math.sin(labelRad);
    const percentage = (
      (item.value / data.reduce((sum, d) => sum + d.value, 0)) *
      100
    ).toFixed(1);

    return (
      <g key={index}>
        <path
          d={pathData}
          fill={colors[index % colors.length]}
          stroke="white"
          strokeWidth="2"
        />
        <text
          x={labelX}
          y={labelY}
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-xs font-bold fill-white"
        >
          {percentage}%
        </text>
      </g>
    );
  });

  const legend = data.map((item, index) => (
    <div key={index} className="flex items-center gap-2">
      <div
        className="w-3 h-3 rounded"
        style={{ backgroundColor: colors[index % colors.length] }}
      />
      <span className="text-sm">{item.name}</span>
    </div>
  ));

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Category Distribution (Pie)</h2>
      <div className="flex justify-center items-start gap-8">
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
          {slices}
        </svg>
        <div className="flex flex-col gap-3 justify-center">{legend}</div>
      </div>
    </div>
  );
};

const BarChart = ({ data, width = 300, height = 300 }) => {
  const colors = [
    "#06B6D4",
    "#3B82F6",
    "#8B5CF6",
    "#EC4899",
    "#F97316",
    "#EF4444",
  ];
  const padding = { top: 20, right: 20, bottom: 40, left: 50 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  if (data.length === 0) return null;

  const maxValue = Math.max(...data.map((d) => d.value));
  const barWidth = chartWidth / data.length;
  const barSpacing = barWidth * 0.1;
  const actualBarWidth = barWidth - barSpacing * 2;

  const xAxisY = padding.top + chartHeight;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Revenue by Category (Bar)</h2>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
          const y = padding.top + chartHeight * (1 - ratio);
          return (
            <g key={`grid-${i}`}>
              <line
                x1={padding.left}
                y1={y}
                x2={padding.left + chartWidth}
                y2={y}
                stroke="#e5e7eb"
                strokeWidth="1"
              />
              <text
                x={padding.left - 10}
                y={y + 4}
                textAnchor="end"
                className="text-xs fill-gray-600"
              >
                ${Math.round(maxValue * ratio)}
              </text>
            </g>
          );
        })}

        {/* X-axis */}
        <line
          x1={padding.left}
          y1={xAxisY}
          x2={padding.left + chartWidth}
          y2={xAxisY}
          stroke="#1f2937"
          strokeWidth="2"
        />

        {/* Y-axis */}
        <line
          x1={padding.left}
          y1={padding.top}
          x2={padding.left}
          y2={xAxisY}
          stroke="#1f2937"
          strokeWidth="2"
        />

        {/* Bars */}
        {data.map((item, index) => {
          const barX = padding.left + index * barWidth + barSpacing;
          const barHeight = (item.value / maxValue) * chartHeight;
          const barY = xAxisY - barHeight;

          return (
            <g key={`bar-${index}`}>
              <rect
                x={barX}
                y={barY}
                width={actualBarWidth}
                height={barHeight}
                fill={colors[index % colors.length]}
                opacity="0.8"
              />
              {/* Value label on top of bar */}
              <text
                x={barX + actualBarWidth / 2}
                y={barY - 5}
                textAnchor="middle"
                className="text-xs font-semibold fill-gray-700"
              >
                ${item.value.toFixed(0)}
              </text>
            </g>
          );
        })}

        {/* X-axis labels */}
        {data.map((item, index) => {
          const labelX = padding.left + index * barWidth + barWidth / 2;
          return (
            <text
              key={`label-${index}`}
              x={labelX}
              y={xAxisY + 20}
              textAnchor="middle"
              className="text-xs fill-gray-700"
              transform={`rotate(45 ${labelX} ${xAxisY + 20})`}
            >
              {item.name.length > 10
                ? item.name.substring(0, 10) + "..."
                : item.name}
            </text>
          );
        })}
      </svg>
    </div>
  );
};

const EstimationChart = () => {
  const [pieChartData, setPieChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchChartData();
    // Set up polling to refresh data every 5 seconds
    const interval = setInterval(fetchChartData, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchChartData = async () => {
    try {
      const products = await adminService.getAllProducts();
      const orders = await adminService.getAllOrders();

      const productList = products?.products || products || [];
      const ordersList = orders?.orders || orders || [];

      // Calculate category distribution for pie chart
      const categoryCount = {};
      productList.forEach((product) => {
        const categoryName = product.category?.name || "Uncategorized";
        categoryCount[categoryName] = (categoryCount[categoryName] || 0) + 1;
      });

      // Calculate revenue from delivered orders by category
      const categoryRevenue = {};
      ordersList.forEach((order) => {
        // Only count delivered orders
        if (order.status === "Delivered") {
          order.orderItems?.forEach((item) => {
            const categoryName =
              item.product?.category?.name || "Uncategorized";
            const itemRevenue = (item.price || 0) * (item.qty || 1);
            categoryRevenue[categoryName] =
              (categoryRevenue[categoryName] || 0) + itemRevenue;
          });
        }
      });

      // Pie chart data - product count
      const pieData = Object.entries(categoryCount).map(([name, count]) => ({
        name,
        value: count,
      }));

      // Bar chart data - revenue from delivered orders
      const barData = Object.entries(categoryRevenue).map(
        ([name, revenue]) => ({
          name,
          value: revenue,
        }),
      );

      setPieChartData(pieData);
      setBarChartData(barData);
    } catch (error) {
      console.error("Failed to fetch chart data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (pieChartData.length === 0 || barChartData.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <p className="text-center text-gray-500">No category data available</p>
      </div>
    );
  }

  return (
    <div className="col-span-full block w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <div className="w-full">
          <PieChart data={pieChartData} />
        </div>

        <div className="w-full">
          <BarChart data={barChartData} />
        </div>
      </div>
    </div>
  );
};

export default EstimationChart;
