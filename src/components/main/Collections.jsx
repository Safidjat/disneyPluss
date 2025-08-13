import { Link } from "react-router-dom";
import { collections } from "../../services/componentsData";
import CollectionItem from "./CollectionItem";


function Collections() {

    return (
        <div  
        style={{ '--grid-cols':collections.length}}
        className={`pb-[50px] w-full max-[340px]:px-[40px] px-[60px] grid grid-cols-2 min-[900px]:grid-cols-[repeat(var(--grid-cols),minmax(0,1fr))] gap-4`}>
            {
                collections?.map(item=>(
                    <Link key={item.id} to={'/category/' + item.id}>
                        <CollectionItem item={item} />
                    </Link>
                ))
            }
        </div>
    )
}

export default Collections
