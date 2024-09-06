using {NorthWind as external} from './external/NorthWind.csn';

@rest service CatalogService {

    @readonly
    entity Products as projection on external.Products {
        key ID, Name, Description, ReleaseDate, DiscontinuedDate, Rating, Price
    };

}