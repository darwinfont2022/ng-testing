import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";

import { TokenService } from "./token.service";
import { AuthService } from "./auth.service";
import { Auth } from "../models/auth.model";
import { environment } from "src/environments/environment";

fdescribe('AuthService', () => {
    let authService: AuthService;
    let httpController: HttpTestingController;
    let tokenService: TokenService;
    const API_URL = `${environment.API_URL}/api/v1/auth`;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                AuthService,
                TokenService,
            ]
        });
        authService = TestBed.inject(AuthService);
        httpController = TestBed.inject(HttpTestingController);
        tokenService = TestBed.inject(TokenService);
    })

    afterEach(() => {
        httpController.verify();
    })

    describe('tests login', () => {
        it('should behave return a token', (doneFn) => {
            const token = '123'
            const mockDta: Auth = {
                access_token: '123',
            };
            const email = 'email@gmail.com'
            const password = '123456'

            spyOn(tokenService, 'getToken').and.returnValue(token);

            authService.login(email, password)
                .subscribe((data) => {
                    expect(data.access_token).toEqual(mockDta.access_token);
                    doneFn();
                });
            const url = `${API_URL}/login`;
            const req = httpController.expectOne(url);
            req.flush(mockDta);
        });

        it('should call to saveToken', (doneFn) => {
            const token = '123'
            const mockDta: Auth = {
                access_token: '123',
            };
            const email = 'email@gmail.com'
            const password = '123456'

            spyOn(tokenService, 'saveToken').and.callThrough();

            authService.login(email, password)
                .subscribe((data) => {
                    expect(data.access_token).toEqual(mockDta.access_token);
                    expect(tokenService.saveToken).toHaveBeenCalledTimes(1);
                    expect(tokenService.saveToken).toHaveBeenCalledWith(token);
                    doneFn();
                });
            const url = `${API_URL}/login`;
            const req = httpController.expectOne(url);
            req.flush(mockDta);
        });
    });

    it('should be created', () => {
        expect(authService).toBeTruthy();
    })
});