import { TestBed } from "@angular/core/testing";
import { ProductsService } from "./product.service";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { CreateProductDTO, Product, UpdateProductDTO } from "../models/product.model";
import { environment } from "./../../environments/environment";

import { genertateOneProduct, generateProducts } from "../models/product.mock";

describe('Product Service', () => {
    let productService: ProductsService;
    let httpController: HttpTestingController;
    const API_URL = `${environment.API_URL}/api/v1`;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                ProductsService
            ]
        });
        productService = TestBed.inject(ProductsService);
        httpController = TestBed.inject(HttpTestingController);
    })

    afterEach(() => {
        httpController.verify();
    })

    it('should be created', () => {
        expect(productService).toBeTruthy();
    })

    describe('Test method getOne', () => {
        it('should be return one component', (doneFn) => {
            const mockProduct = genertateOneProduct();
            
            productService.getOne(mockProduct.id).subscribe(product => {
                expect(product).toEqual(mockProduct);
                doneFn();
            });
            
            const url = `${API_URL}/${mockProduct.id}`;
            const req = httpController.expectOne(url);
            req.flush(mockProduct);
            expect(req.request.method).toBe('GET');
        });
    });

    describe('Test update method', () => {
        it('should update one product', (doneFn) => {
            const mockProduct = genertateOneProduct();
            const id = mockProduct.id;
            const updateProductDTO: UpdateProductDTO = {
                title: 'Nuevo titulo',
            }
            productService.update(id, {...updateProductDTO}).subscribe((product) => {
                expect(product).toBe(mockProduct);
                doneFn();
            })
            const url = `${API_URL}/${id}`;
            const req = httpController.expectOne(url);
            req.flush(mockProduct);
            expect(req.request.url).toBe(url);
            expect(req.request.method).toBe('PUT');
            expect(req.request.body).toEqual(updateProductDTO);
        });
    });

    describe('Test delete method', () => {
        it('should delete one product', () => {
            const mockResult = true;
            const id = "1";
            productService.delete(id).subscribe((result) => {
                expect(result).toBe(mockResult);
            });
            const url = `${API_URL}/${id}`;
            const req = httpController.expectOne(url);
            req.flush(mockResult);
            expect(req.request.url).toBe(url);
            expect(req.request.method).toBe('DELETE');
        });
    });

    describe('Test method create', () => {
        it('should create a product', (doneFn) => {
            const mockProduct = genertateOneProduct();
            const mockProductDTO: CreateProductDTO = {
                title: "asd",
                price: 12,
                description: "asd",
                images: ["img1", "img2"],
                categoryId: 5
            }
            productService.create({...mockProductDTO}).subscribe(product => {
                expect(product).toEqual(mockProduct);
                doneFn();
            });
            const req = httpController.expectOne(API_URL);
            req.flush(mockProduct);
            expect(req.request.body).toEqual(mockProductDTO);
            expect(req.request.method).toBe('POST');
        });
    });

    describe('Test for method getAll', () => {
        it('should behave return a product list', (doneFn) => {
            const mockProducts: Product[] = generateProducts(10);
            productService.getAll()
                .subscribe((data) => {
                    expect(data.length).toEqual(mockProducts.length);
                    doneFn();
                });
            const url = `${API_URL}/products`;
            const req = httpController.expectOne(url);
            req.flush(mockProducts);
        });

        it('should be send query params getAll limit 10 and offset 3', (doneFn) => {
            const mockProducts: Product[] = generateProducts(10);
            const limit = 10;
            const offset = 3;
            productService.getAll(limit, offset)
                .subscribe((data) => {
                    expect(data.length).toEqual(mockProducts.length);
                    doneFn();
                });
            const url = `${API_URL}/products?limit=${limit}&offset=${offset}`;
            const req = httpController.expectOne(url);
            req.flush(mockProducts);
            const params = req.request.params;
            expect(params.get('limit')).toEqual(limit.toString());
            expect(params.get('offset')).toEqual(offset.toString());
        });
    });

    describe('Test taxes of product', () => {
        it('should behave return taxes iquals 19 and 38', () => {
            const mockProduct: Product[] = [
                { ... genertateOneProduct(), price: 100},
                { ... genertateOneProduct(), price: 200},
                { ... genertateOneProduct(), price: 0},
                { ... genertateOneProduct(), price: -100},
            ];
            productService.getAll().subscribe(
                (data) => {
                    expect(data.length).toEqual(mockProduct.length);
                    expect(data[0].taxes).toEqual(19);
                    expect(data[1].taxes).toEqual(38);
                    expect(data[2].taxes).toEqual(0);
                    expect(data[3].taxes).toEqual(0);
                }
            )
            const url = `${API_URL}/products`;
            const req = httpController.expectOne(url);
            req.flush(mockProduct);
        });
    });

    describe('Test for method getAllSimpel', () => {
        it('should behave return a product list', (doneFn) => {
            const mockProducts: Product[] = generateProducts();
            productService.getAllSimple()
                .subscribe((data) => {
                    expect(data.length).toEqual(mockProducts.length);
                    doneFn();
                });
            const url = `${API_URL}/products`;
            const req = httpController.expectOne(url);
            req.flush(mockProducts);
        });
    });
});