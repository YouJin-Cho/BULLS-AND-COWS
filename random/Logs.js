import '../App.css';

const Logs = (props) => {
  return (
    <>
      <h2>🥎 결과보기 🥎</h2>
      <ol>
        {
          props.logs.map((item, index) => {
            return (
              <li key={`${item}_${index}`}>{item}</li>
            )
          })
        }
      </ol>
    </>
  )
}

export default Logs