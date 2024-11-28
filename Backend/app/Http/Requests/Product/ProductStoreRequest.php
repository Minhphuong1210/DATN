<?php

namespace App\Http\Requests\Product;

use Illuminate\Foundation\Http\FormRequest;

class ProductStoreRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
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
            'image.required' => 'Hình ảnh chính là bắt buộc.',
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
        $validator->after(function ($validator) {
            $products = $this->input('products');
            $existingVariants = [];
            foreach ($products as $productVariant) {
                $variantKey = $productVariant['size_id'] . '-' . $productVariant['color_id'];
                if (in_array($variantKey, $existingVariants)) {
                    $validator->errors()->add('products', 'Kích thước và màu sắc bị trùng: ');
                }

                $existingVariants[] = $variantKey;
            }
        });
    }
}
