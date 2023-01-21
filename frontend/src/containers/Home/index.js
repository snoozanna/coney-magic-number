import Footer from "../../components/Footer";
const Home = () => {
  return (
    <>
      <h1>The Magic Number</h1>
      <h2>Improvements to make:</h2>
      <ul>
        <li>
          • Relational Questions (last time you said X, what do you think now?)
        </li>
        <li>• Multiple surveys - currently only one possible</li>
        <li>• Download to excel doc</li>
        <li>• For slider questions, display the number as slider is moved</li>
        <li>• Dynmaic URLs for new surveys</li>
        <li>• Register - list of codenames and if they have completed form</li>
        <li>• Codenames rather than email addresses</li>
      </ul>
      <Footer />
    </>
  );
};

export default Home;
