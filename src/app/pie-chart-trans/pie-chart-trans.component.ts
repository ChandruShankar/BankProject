import { Component, Input, OnInit } from '@angular/core';

import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import * as d3j from 'd3';

@Component({
  selector: 'app-pie-chart-trans',
  templateUrl: './pie-chart-trans.component.html',
  styleUrls: ['./pie-chart-trans.component.css']
})
export class PieChartTransComponent implements OnInit {
 
  @Input() bankData: any
  
  margin = {top: 20, right: 20, bottom: 30, left: 50};
  width: number;
  height: number;
  radius: number;

  arc: any;
  labelArc: any;
  labelPer: any;
  pie: any;
  color: any;
  svg: any;

  constructor() {
    this.width = 900 - this.margin.left - this.margin.right ;
    this.height = 500 - this.margin.top - this.margin.bottom;
    this.radius = Math.min(this.width, this.height) / 2;
  }

  ngOnInit(): void {   

    console.log("ALINA "+this.bankData)
    this.initSvg();
    this.drawPie(this.bankData);
  
  }

  initSvg() {
    this.color = d3Scale.scaleOrdinal()
        .range(['#FFA500', '#00FF00', '#FF0000', '#6b486b', '#FF00FF', '#d0743c', '#00FA9A']);
    this.arc = d3Shape.arc()
        .outerRadius(this.radius - 10)
        .innerRadius(0);
    this.labelArc = d3Shape.arc()
        .outerRadius(this.radius - 40)
        .innerRadius(this.radius - 40);

    this.labelPer = d3Shape.arc()
        .outerRadius(this.radius - 80)
        .innerRadius(this.radius - 80);

    this.pie = d3Shape.pie()
        .sort(null)
        .value((d: any) => d.amount);

    this.svg = d3.select('#pieChartTrans')
        .append('svg')
        .attr('width', '100%')
        .attr('height', '100%')
        .attr('viewBox', '0 0 ' + Math.min(this.width, this.height) + ' ' + Math.min(this.width, this.height))
        .append('g')
        .attr('transform', 'translate(' + Math.min(this.width, this.height) / 2 + ',' + Math.min(this.width, this.height) / 2 + ')');
  }

  drawPie(data:any) {
   
    const g = this.svg.selectAll('.arc')
        .data(this.pie(data))
        .enter().append('g')
        .attr('class', 'arc');
    g.append('path').attr('d', this.arc)
        .style('fill', (d: any) => this.color(d.data.label) );
    g.append('text').attr('transform', (d: any) => 'translate(' + this.labelArc.centroid(d) + ')')
        .attr('dy', '.35em')
        .text((d: any) => d.data.label);

    g.append('text').attr('transform', (d: any) => 'translate(' + this.labelPer.centroid(d) + ')')
        .attr('dy', '.35em')
        .text((d: any) => Number(d.data.amount) + '%');
  }

}


export interface BarData {
  label: string;
  amount: number;
}