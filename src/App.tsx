import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";
import BasicTables from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import Tasks from "./components/pages/Tasks";
import CreatedByMe from "./components/pages/CreateByMe";
import GoalCreation from "./pages/GoalCreation";
import AssignEmployee from "./pages/AssignEmployee";
import CategoryPage from "./components/pages/CategoryPage";
import CategoriesTable from "./components/pages/CategoriesTable";
import AssignmwntList from "./components/pages/AssignmentList";
import EvaluationSummaryReport from "./components/pages/AssessmentSummaryReport";
import EvaluationDetailReport from "./pages/AssessmentDetailReport";
import EvaluationGoalWiseReport from "./pages/AssessmentGoalWiseReport";
import Evaluation from "./pages/Evaluation";
import EvaluationTemplate from "./pages/EvaluationTemplate";
import AssessmentSummaryReport from "./components/pages/AssessmentSummaryReport";
import AssessmentDetailReport from "./pages/AssessmentDetailReport";
import AssessmentGoalWiseReport from "./pages/AssessmentGoalWiseReport";

export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}
          <Route element={<AppLayout />}>
            <Route index path="/" element={<Home />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/Createdbyme" element={<CreatedByMe />} />
            <Route path="/goalcreation" element={<GoalCreation />} />
            <Route path="/evaluationtemplate" element={<EvaluationTemplate />} />
            <Route path="/employeeassignment" element={<AssignEmployee />} />
            <Route path="/assignmentlist" element={<AssignmwntList />} />
            <Route path="/category" element={<CategoryPage />} />
            <Route path="/categoriesTable" element={<CategoriesTable />} />
            <Route path="/assessmentsummaryreport" element={<AssessmentSummaryReport />} />
            <Route path="/assessmentdetailreport" element={<AssessmentDetailReport />} />
            <Route path="/assessmentgoalwisereport" element={<AssessmentGoalWiseReport />} />
            <Route path="/goalevaluation" element={<Evaluation />} />



            {/* Others Page */}
            <Route path="/profile" element={<UserProfiles />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/blank" element={<Blank />} />

            {/* Forms */}
            <Route path="/form-elements" element={<FormElements />} />

            {/* Tables */}
            <Route path="/basic-tables" element={<BasicTables />} />

            {/* Ui Elements */}
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/avatars" element={<Avatars />} />
            <Route path="/badge" element={<Badges />} />
            <Route path="/buttons" element={<Buttons />} />
            <Route path="/images" element={<Images />} />
            <Route path="/videos" element={<Videos />} />

            {/* Charts */}
            <Route path="/line-chart" element={<LineChart />} />
            <Route path="/bar-chart" element={<BarChart />} />
          </Route>

          {/* Auth Layout */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
