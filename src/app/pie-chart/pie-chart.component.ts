import { Component, Input, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {
  @Input() bankData: any
  //  data =  [   
  //     {"label":"Debit", "value": 3000.0}, 
  //     {"label":"Credit", "value": 450.0}, 
  //     {"label":"Balance", "value": 4000.0}
  //     ];
   svg: any;
   margin = 50;
   width = 380;
   height = 400;
   radius = Math.min(this.width, this.height) / 2 - this.margin;
   colors:any;

   constructor()
  {
  }   
  ngOnInit(): void {
    this.createSvg();
    this.createColors();
   this.drawChart();
  }
    
   createSvg(): void {
      this.svg = d3.select("figure#pie")
      .append("svg")
      .attr("width", this.width)
      .attr("height", this.height)
      .append("g")
      .attr(
        "transform",
        "translate(" + this.width / 2 + "," + this.height / 2 + ")"
      );
    }
  
    createColors(): void {
      this.colors = d3.scaleOrdinal()
      .domain(this.bankData.map((d:any) => d.label))
      .range(["#498bfc","#045df4","#307bfc"]);
    }
  
   drawChart(): void {
    const pie = d3.pie<any>().value((d: any) => Number(d.amount));
    this.svg
    .selectAll('pieces')
    .data(pie(this.bankData))
    .enter()
    .append('path')
    .attr('d', d3.arc()
      .innerRadius(0)
      .outerRadius(this.radius)
    )
    .attr('fill', (d:any, i:any) => (this.colors(i)))
    .attr("stroke", "#121926")
    .style("stroke-width", "1px");
  
    const labelLocation = d3.arc()
    .innerRadius(25)
    .outerRadius(this.radius);
  
    this.svg
    .selectAll('pieces')
    .data(pie(this.bankData))
    .enter()
    .append('text')
    .text((d: { data: { label: any; amount:any; }; }) => d.data.label + " - "+ d.data.amount)
    .attr("transform", (d: d3.DefaultArcObject) => "translate(" + labelLocation.centroid(d) + ")")
    .style("text-anchor", "middle")
    .style("font-size", 15)
    .style('fill', 'black');
  }
 
  }
    export let StatsPieChart: PieData[] = [
      {label: 'Balance', amount: 0},
      {label: 'Debit', amount: 100000},
      {label: 'Credit', amount: 100000}
    ];  

    export interface PieData {
      label: string;
      amount: number;
    }
    
 



