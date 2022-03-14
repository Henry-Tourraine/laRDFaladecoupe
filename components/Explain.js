import { ReactComponent as Arrow } from './Arrow.svg'

const Explain = () => {
    let xplain = [{
        title: "fsdfdsf",
        response: "ffdfdfg"
    }]
    return (<div>{xplain.map((e, index) => {
        return <div key={index}>

            <div>{e.title}</div>
            <p>{e.response}</p>
        </div>
    })}
    </div >)
}

export default Explain;