import React, { useEffect } from "react";
import StatCard from "./StatCard";
import InvoiceChart from "./InvoiceChart";
import SalesChart from "./SalesChart";
import {
  FiUsers,
  FiDollarSign,
  FiTrendingUp,
  FiFileText,
} from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux';
import { asyncGetSubmissionsByUser } from "../../store/actions/submissionAciton";

function DashboardHome() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { getSubmissionsByUser } = useSelector((state) => state.submission);

  useEffect(() => {
    if (user?._id) {
      dispatch(asyncGetSubmissionsByUser(user._id));
    }
  }, [user, dispatch]);

  const totalSubmissions = getSubmissionsByUser.length;
  const correctSubmissions = getSubmissionsByUser.filter(
    (item) => item.status === "passed"
  ).length;
  const wrongSubmissions = totalSubmissions - correctSubmissions;
  const totalScore = getSubmissionsByUser.reduce(
    (acc, curr) => acc + (curr.score || 0),
    0
  );

  return (
    <div className="space-y-10">
      {/* 📊 Stat Cards Section */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          <StatCard
            title="Total Submission"
            value={totalSubmissions}
            change=""
            status="up"
            icon={<FiUsers />}
          />
          <StatCard
            title="Wrong Submission"
            value={wrongSubmissions}
            change=""
            status="down"
            icon={<FiDollarSign />}
          />
          <StatCard
            title="Correct Submission"
            value={`${Math.round((correctSubmissions / totalSubmissions) * 100) || 0}%`}
            change=""
            status="up"
            icon={<FiTrendingUp />}
          />
          <StatCard
            title="Total Score"
            value={totalScore}
            change=""
            status="up"
            icon={<FiFileText />}
          />
        </div>
      </section>

      {/* 📈 Charts Section */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Analytics</h2>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <InvoiceChart />
          <SalesChart />
        </div>
      </section>
    </div>
  );
}

export default DashboardHome;
