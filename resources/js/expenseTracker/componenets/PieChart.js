import React from 'react';
import {CanvasJSChart, CanvasJS} from "canvasjs-react-charts";
import axios from "axios";
import {capitalizeFLetter} from "../functions";

CanvasJS.addColorSet('colorSet',
    [
        "#003f5c",
        "#2f4b7c",
        "#665191",
        "#a05195",
        "#d45087",
        "#f95d6a",
        "#ff7c43",
        "#ffa600"
    ]);

class PieChart extends React.Component{
    constructor(props) {
        super(props);

        this.state={
            data: null
        }
        this.getCategories();
    }

    getCategories(){
        axios.get('/api/pieChart').then(response=>{
            this.setState({
                data: response.data.data
            })
        }).catch(error=>{

        });
    }

    render() {
        const options = {
            exportEnabled: true,
            animationEnabled: true,
            colorSet: 'colorSet',
                title: {
                text: "Categories"
            },
            data: [{
                type: "pie",
                startAngle: 75,
                toolTipContent: "<b>{label}</b>:  #percent%",
                showInLegend: "true",
                legendText: "{label} having {y} expenses",
                indexLabelFontSize: 16,
                indexLabel: "{label}",
                dataPoints: this.state.data
            }]
        }
        return (
            <div>
                <CanvasJSChart options = {options}
                    onRef={ref => this.chart = ref}
                />
            </div>
        );
    }
}

export default PieChart;
