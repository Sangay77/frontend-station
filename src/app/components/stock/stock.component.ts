import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css'],
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent]
})
export class StockComponent implements OnInit {
  stocks: any[] = []; // Holds stock data

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchStocks();
  }
  fetchStocks(): void {
    const endpoint = 'https://rsebl.org.bt/agm/api/fetch-live-market';
    this.http.get<any[]>(endpoint).subscribe(
      (data) => {
        this.stocks = data.map(stock => ({
          ...stock,
          price: this.parseNumber(stock.price),
          currentPrice: this.parseNumber(stock.currentPrice),
          value: this.parseNumber(stock.value)
        }));
      },
      (error) => console.error('Error fetching stocks:', error)
    );
  }
  
  private parseNumber(value: any): number {
    return typeof value === 'string' ? Number(value.replace(/,/g, '')) || 0 : Number(value) || 0;
  }
  
}
