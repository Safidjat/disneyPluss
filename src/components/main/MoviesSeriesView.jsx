import { genres } from "../../services/componentsData"
import BlogView from "./BlogView"
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

function MoviesSeriesView() {

    return (
        <div className="w-full max-[210px]:px-[16px] pt-[40px] p-[60px] flex flex-col gap-[50px]">
            <div className="flex flex-col gap-[15px] items-start min-[600px]:items-center min-[600px]:flex-row min-[600px]:justify-between min-[700px]:justify-start min-[700px]:gap-[30px]">
                <h1 className="text-[18px] min-[800px]:text-[25px] font-bold text-white">My List</h1>
                <div className="relative w-[200px] max-[320px]:w-[120px] ">
                    <div className="absolute top-[9px] max-[320px]:top-[4px] right-[15px] max-[320px]:right-[5px] flex items-center cursor-pointer">
                        <div className="h-[18px] w-[1px] bg-[#f9f9f9]"></div>
                        <ArrowDropDownIcon fontSize="medium" sx={{color:'#808080'}} />
                    </div>
                    <select id="typeSelect" className="size-full py-[10px] px-[20px] max-[320px]:px-[10px] max-[320px]:py-[5px] rounded-[50px] group cursor-pointer [text-align-last:center] text-[13px] font-[400] bg-[#31333c] hover:bg-[#31333C0D] border border-[#767676] text-white transition-all duration-[0.3s] appearance-none outline-none ">
                        {
                            genres
                            .filter(item=>item.type.includes('movie'))
                            .sort((a, b) => a.name.localeCompare(b.name, 'en'))
                            .map(item=>(
                                <option key={item.id} value={item.num} className="group-hover:bg-[#98999d] bg-[#31333c]">{item.name}</option>
                            ))
                        }
                    </select>
                </div>
                
            </div>
            <div>
                {
                    
                    // <BlogView />
                    
                }
            </div>
        </div>
    )
}

export default MoviesSeriesView
