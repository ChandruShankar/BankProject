import { Component, Input, OnInit } from '@angular/core';


import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';
import * as d3j from 'd3';
import { BankData } from './data.model';


@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chat.component.html',
  styleUrls: ['./bar-chat.component.css']
})

export class BarChatComponent implements OnInit {
  @Input() bankData: any
  currentRate = 8;
  title = 'Whole picture';
  width: number;
  height: number;
  margin = { top: 20, right: 20, bottom: 30, left: 40 };
  x: any;
  y: any;
  svg: any;
  g: any;


  constructor() {
    this.width = 900 - this.margin.left - this.margin.right;
    this.height = 500 - this.margin.top - this.margin.bottom;
  }

  ngOnInit() {

    // d3j.json(this.bankData).then((data: any) => {
    //   this.initSvg();
    //   this.initAxis(data);
    //   this.drawAxis();
    //   this.drawBars(data);
      
    // });
    
      this.initSvg();
      this.initAxis(this.bankData);
      this.drawAxis();
      this.drawBars(this.bankData);
  }

  initSvg() {
    this.svg = d3.select('#barChart')
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', '0 0 900 500');
    this.g = this.svg.append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
  }

  initAxis(data: any) {
    this.x = d3Scale.scaleBand().rangeRound([0, this.width]).padding(0.1);
    this.y = d3Scale.scaleLinear().rangeRound([this.height, 0]);
    this.x.domain(data.map((d:any) => d.label) );
    this.y.domain([0, d3Array.max(data, (d:any) => d.amount)]);
    
  }
  
  drawAxis() {
 
    this.g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3Axis.axisBottom(this.x));
    this.g.append('g')
      .attr('class', 'axis axis--y')
      .call(d3Axis.axisLeft(this.y))
      .append('text')
      .attr('class', 'axis-title')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .attr('text-anchor', 'end')
      .text('amount');
  }

  drawBars(data: any) {

 console.log(data)

    this.g.selectAll('.bar')
      .data(data)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', (d:  any) => this.x(d.label))
      .attr('y', (d:  any) => this.y(d.amount))
      .attr('width', this.x.bandwidth())
      .attr('fill', '#498bfc')
      .attr('height', (d:  any) => this.height - this.y(d.amount));
  }

}

export let StatsBarChart1: BarData[] = [
  {label: 'Balance', amount: 0},
  {label: 'Debit', amount: 100000},
  {label: 'Credit', amount: 100000}
];

export interface BarData {
  label: string;
  amount: number;
}
