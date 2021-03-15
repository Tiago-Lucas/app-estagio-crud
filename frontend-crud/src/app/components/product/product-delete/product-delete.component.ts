import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import{Product} from '../product.model'

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

  product:Product={
    nameProduct:'',
    model:'',
    price:0
  }

  constructor(private productService:ProductService, private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if(id){
      this.productService.readById(parseInt(id)).subscribe(product => {
        this.product = product;
      }) 
    
  }
  }
  
  deleteProduct():void{
    if(this.product.id)
    this.productService.delete(this.product.id).subscribe(()=>{
      this.productService.showMessage('Veículo Excluido com Sucesso')
      this.router.navigate(['/products'])
    })
  }


  cancel():void{
    this.router.navigate(['/products'])
  }
}
