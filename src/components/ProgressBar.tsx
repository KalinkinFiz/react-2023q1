import progressBar from '../assets/img/progress.gif';

const ProgressBar = () => {
  return (
    <div>
      <div className="progress-bar">
        <img className="progress-bar-img" src={progressBar} alt="progress" />
      </div>
    </div>
  );
};

export default ProgressBar;
