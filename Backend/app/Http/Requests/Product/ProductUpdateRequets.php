<?php

namespace App\Http\Requests\Product;

use Illuminate\Foundation\Http\FormRequest;

class ProductUpdateRequets extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'image' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
            'list_hinh_anh.*' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'products' => 'required|array',
            'products.*.size_id' => 'required|exists:product_sizes,id',
            'products.*.color_id' => 'required|exists:product_colors,id',
            'products.*.quantity' => 'required|integer|min:1',
            'is_sale' => 'nullable|boolean',
            'is_hot' => 'nullable|boolean',
            'is_show_home' => 'nullable|boolean',
            'is_active' => 'nullable|boolean',
        ];
    }
    public function messages()
    {
        return [
            'products.required' => 'Danh sách sản phẩm là bắt buộc.',
            'products.*.size_id.required' => 'Kích thước là bắt buộc.',
            'products.*.color_id.required' => 'Màu sắc là bắt buộc.',
            'products.*.quantity.required' => 'Số lượng là bắt buộc.',
            'products.*.size_id.exists' => 'Kích thước không tồn tại.',
            'products.*.color_id.exists' => 'Màu sắc không tồn tại.',
        ];
    }

    public function withValidator($validator)
    {
        // $validator->after(function ($validator) {
        //     $products = $this->input('products');
        //     $existingVariants = [];
        //     foreach ($products as $index => $productVariant) {
        //         $variantKey = $productVariant['size_id'] . '-' . $productVariant['color_id'];
        //         if (in_array($variantKey, $existingVariants)) {
        //             $validator->errors()->add(
        //                 "products.$index",
        //                 'Kích thước và màu sắc bị trùng tại sản phẩm: ' . 
        //                 'Size ID: ' . $productVariant['size_id'] . ', Color ID: ' . $productVariant['color_id']
        //             );
        //         }
        
        //         $existingVariants[] = $variantKey;
        //     }
        // });


        $validator->after(function ($validator) {
            $products = $this->input('products');
        
            if (empty($products)) {
                $validator->errors()->add('products', 'Danh sách sản phẩm không được để trống.');
                return;
            }
        
            $existingVariants = []; // Mảng để lưu các cặp đã tồn tại
            foreach ($products as $key => $productVariant) {
                // Kiểm tra dữ liệu đầu vào có hợp lệ không
                if (empty($productVariant['size_id']) || empty($productVariant['color_id'])) {
                    $validator->errors()->add('products', "Sản phẩm ở hàng {$key} thiếu kích thước hoặc màu sắc.");
                    continue;
                }
        
                // Xây dựng khóa trùng lặp
                $variantKey = $productVariant['color_id'] . '-' . $productVariant['size_id'];
        
                // Kiểm tra trùng lặp
                if (isset($existingVariants[$variantKey])) {
                    $validator->errors()->add(
                        'products',
                        "Biến thể trùng lặp: Màu sắc {$productVariant['color_id']} và kích thước {$productVariant['size_id']} đã tồn tại."
                    );
                }
        
                // Lưu vào danh sách đã kiểm tra
                $existingVariants[$variantKey] = true;
            }
        });
    }
}
