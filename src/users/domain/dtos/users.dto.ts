import { IsNotEmpty } from 'class-validator';

export class UsersDto {
    @IsNotEmpty()
    partner_id: string;

    @IsNotEmpty()
    x_birthday: string;

    @IsNotEmpty()
    x_gender: string;

    x_avatar: string;
}

export class AddressDto {
    id: string;

    @IsNotEmpty()
    x_address_name: string;

    @IsNotEmpty()
    x_default_address: string;

    @IsNotEmpty()
    x_details_address: string;

    @IsNotEmpty()
    x_name: string;

    @IsNotEmpty()
    x_partner_id: string;

    @IsNotEmpty()
    x_phone_address: string;

    @IsNotEmpty()
    x_receive_address: string;

    x_default_address_id: string;
}
